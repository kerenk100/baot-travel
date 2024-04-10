import React from "react";
import styles from "./Content.module.scss";
import cn from "classnames";

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export const Content: React.FC<ContentProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div className={cn(styles.content, className)} {...rest}>
      {children}
    </div>
  );
};
