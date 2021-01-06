import { motion } from "framer-motion";

const Motion = ({ duration, elem, ...otherProps }) => {
  const Tag = motion[elem];
  return (
    <Tag
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: parseFloat(duration) }}
      {...otherProps}
    ></Tag>
  );
};

export default Motion;
