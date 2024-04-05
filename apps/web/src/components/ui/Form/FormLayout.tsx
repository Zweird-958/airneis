import React from "react"

export const FormLayout = ({
  children,
  labelForm,
}: {
  children: React.ReactNode
  labelForm: string
}) => (
  <div className="h-screen flex items-center justify-center w-full absolute top-0 px-4">
    <div className="max-w-96 mx-auto rounded-default p-4 bg-card w-full">
      <h1 className="text-center text-xl text-primary font-semibold">
        {labelForm}
      </h1>
      {children}
    </div>
  </div>
)
