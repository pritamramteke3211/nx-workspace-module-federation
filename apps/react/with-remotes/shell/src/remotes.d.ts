declare module 'remote1/Module' {
  const Module: React.ComponentType;
  export default Module;
}

declare module 'myremote/Module' {
  const Module: React.ComponentType;
  export default Module;
}

declare module 'myremote/MyRemoteButton' {
  import React from 'react';

  export interface ButtonProps {
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    children: React.ReactNode;
  }

  export const Button: React.FC<ButtonProps>;
  export default Button;
}
