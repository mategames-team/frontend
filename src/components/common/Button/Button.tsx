import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Button.module.scss';

type Variant = 'primary' | 'secondary' | 'danger';
type Size = 'sm' | 'md' | 'lg';

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
};

type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: string;
    to?: string;
  };

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth,
  icon,
  iconPosition = 'left',
  className,
  href,
  to,
  ...props
}: ButtonProps) => {
  const classes = clsx(
    styles.button,
    styles[variant],
    styles[size],
    { [styles.fullWidth]: fullWidth },
    className
  );

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className={styles.icon}>{icon}</span>
      )}
      <span className={styles.label}>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className={styles.icon}>{icon}</span>
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
};
