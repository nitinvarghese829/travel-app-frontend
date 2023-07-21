import {     useState } from 'react';


// eslint-disable-next-line react/prop-types
const SidebarLinkGroup = ({children, activeCondition}) => {
    const [open, setOpen] = useState(activeCondition);

    const handleClick = () => {
        setOpen(!open);
    };

    return <li>{children(handleClick, open)}</li>;
};

export default SidebarLinkGroup;