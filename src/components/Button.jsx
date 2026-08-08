import React from "react";

// Module-level constants (never recreated on render)
const BASE_STYLES = [
  "inline-flex items-center justify-center gap-2",
  "font-inter font-bold text-base text-black uppercase tracking-wide",
  "border-2 border-black",
  "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
  "transition-all duration-150 ease-in-out",
  "cursor-pointer select-none",

  /* Interactive States */
  "hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[1px] hover:-translate-y-[1px]",
  "active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
  "disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] disabled:translate-x-0 disabled:translate-y-0"
].join(" ");

const VARIANTS = {
  primary: "bg-cyan-400 hover:bg-cyan-500 active:bg-cyan-600 disabled:bg-cyan-700",
  secondary: "bg-white hover:bg-gray-100 active:bg-gray-200 disabled:bg-gray-300",
};

export const Button = ({
  children,
  variant = 'primary',
  showIcon = true,
  icon: Icon,
  iconPosition = 'right',
  isIconOnly = false,
  disabled = false,
  href,
  className = '',
  type = 'button',
  ...props
}) => {
  // 1. Dynamic Element (a or button)
  const Component = href ? 'a' : 'button';

  // 2. Safe Variant Resolution
  const variantClass = VARIANTS[variant] || VARIANTS.primary;

  const sizeStyles = isIconOnly ? 'w-12 h-12 p-0' : 'h-12 px-4 py-2';
  // 3. Conditional Link Attributes
  const componentProps = href
    ? { href: disabled ? undefined : href, 'aria-disabled': disabled }
    : { type, disabled };

  return (
    <Component
      className={`${BASE_STYLES} ${sizeStyles} ${variantClass} ${className}`}
      {...componentProps}
      {...props}
    >
        {isIconOnly ? (
            Icon ? <Icon className="w-5 h-5 shrink-0"/> : children
        ) : (
            <>
            {showIcon && Icon && iconPosition === 'left' && (
                <Icon className="w-4 h-4 shrink-0" />
            )}
            
            {children && <span>{children}</span>}
            
            {showIcon && Icon && iconPosition === 'right' && (
                <Icon className="w-4 h-4 shrink-0" />
            )}
            </>
        )}

      
    </Component>
  );
};
