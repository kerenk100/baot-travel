import React from 'react';
import iconComponents, { IconType } from './iconsLib';
import styles from './Icon.module.scss'

interface IconProps{
    name:keyof typeof iconComponents
    fill?:string,
    size?:number | '100%'
}

//TODO: finish

const Icon = ({name, fill = '#000', size = 24, ...rest}:IconProps) => {
  const IconComponent = iconComponents[name];
  if (!IconComponent) return null;
  return <IconComponent style={{fill:fill, height:size, width:size}} className={styles.icon} {...rest} />;
};

export default Icon;