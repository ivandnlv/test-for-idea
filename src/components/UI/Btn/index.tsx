import { ReactNode } from 'react';

interface BtnProps {
  children: ReactNode;
  clickFunc: () => void;
}

function Btn({ children, clickFunc }: BtnProps) {
  return (
    <button className="btn" onClick={clickFunc}>
      {children}
    </button>
  );
}

export default Btn;
