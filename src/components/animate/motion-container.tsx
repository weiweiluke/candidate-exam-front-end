import { m, MotionProps } from 'framer-motion';

import { varContainer } from './variants/container';

interface Props extends MotionProps {
  className?: string;
}

/**
 * A container component that animates its children when they are added or removed.
 */
export default function MotionContainer({ children, className }: Props) {
  return (
    <m.div
      // By specifying the property names for initial, animate, and exit here, the child components do not need to specify them again.
      initial="initial"
      animate="animate"
      exit="exit"
      variants={varContainer()}
      className={className}
    >
      {children}
    </m.div>
  );
}
