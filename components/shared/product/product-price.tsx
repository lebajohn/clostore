import { cn } from "@/lib/utils";

const ProductPrice = ({ 
    value, 
    className 
}: { 
    value: number; 
    className?: string; 
}) => {

    const hasDecimal = value % 1 !== 0;

    return ( <p className={ cn('text-2xl', className)}>
        <span className="text-xs align-super">Ksh</span>
        {hasDecimal ? value.toFixed(2) : value}
    </p> );
}
 
export default ProductPrice;