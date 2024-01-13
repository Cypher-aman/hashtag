import React from 'react';

const FormWrapper = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="space-y-5">
      <h3 className="text-3xl authpage-title font-bold pt-4">{title}</h3>
      {children}
    </div>
  );
};

export default FormWrapper;
