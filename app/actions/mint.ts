'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

// Validation schema
const TokenFormSchema = z.object({
    userWalletAddress: z.string().optional(),
    name: z.string().min(1, 'Token name is required'),
    symbol: z.string().min(1, 'Token symbol is required'),
    description: z.string().min(1, 'Description is required'),
    mintAmount: z.coerce.number().positive('Mint amount must be positive'),
});

export type TokenFormState = {
    errors?: {
        name?: string[];
        symbol?: string[];
        description?: string[];
        mintAmount?: string[];
        image?: string[];
        _form?: string[];
    };
    message?: string | null;
};

export async function createToken(
    prevState: TokenFormState,
    formData: FormData,
): Promise<TokenFormState> {
    try {
        // Get the access token from the special form field
        const accessToken = formData.get('accessToken') as string;
        if (!accessToken) {
            return {
                errors: {
                    _form: ['Authentication required'],
                },
                message: 'Authentication required. Please login again.',
            };
        }

        // Validate form data
        const validatedFields = TokenFormSchema.safeParse({
            name: formData.get('name'),
            symbol: formData.get('symbol'),
            description: formData.get('description'),
            mintAmount: formData.get('mintAmount'),
            userWalletAddress: formData.get('userWalletAddress'),
        });

        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                message: 'Invalid fields. Failed to create token.',
            };
        }

        const image = formData.get('image') as File;
        if (!image || image.size === 0) {
            return {
                errors: {
                    image: ['Image is required'],
                },
                message: 'Image is required. Failed to create token.',
            };
        }

        // Create API form data
        const apiFormData = new FormData();
        apiFormData.append('image', image);
        Object.entries(validatedFields.data).forEach(([key, value]) => {
            if (value !== undefined) {
                apiFormData.append(key, value.toString());
            }
        });

        // Make API request with auth header
        const response = await fetch('/api/tokens/create', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: apiFormData,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.message || 'Failed to create token');
        }

        // Revalidate the tokens page
        revalidatePath('/tokens');

        return {
            message: 'Token created successfully.',
        };
    } catch (error) {
        return {
            errors: {
                _form: [(error as Error).message || 'Failed to create token'],
            },
            message: 'Failed to create token.',
        };
    }
}
