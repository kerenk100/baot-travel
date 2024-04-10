import Logo from './Logo'


const iconComponents:Record<string,React.FC<React.SVGProps<any>>> = {
    "logo": Logo
    // Add more icons here as needed
};

export type IconType = keyof typeof iconComponents
export default iconComponents