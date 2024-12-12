import PresaleList from "@/components/PresaleList";
import {samplePresales} from "@/data/presale";

export default function PresalesPage() {
    return (
        <div className="w-full min-w-0">
            <div className="flex flex-col gap-8 w-full">
                <div>
                    <h1 className="text-3xl font-bold">
                        Active Presales
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        View and participate in active token presales
                    </p>
                </div>

                <PresaleList presales={samplePresales} />
            </div>
        </div>
    );
}