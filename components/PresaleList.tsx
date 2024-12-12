import PresaleCard from "@/components/PresaleCard";
import {PresaleListProps} from "@/types/presale";

const PresaleList: React.FC<PresaleListProps> = ({ presales }) => {
    return (
        <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2">
                {presales.map((presale, index) => (
                    <PresaleCard key={index} presale={presale} />
                ))}
            </div>
        </div>
    );
};

export default PresaleList;