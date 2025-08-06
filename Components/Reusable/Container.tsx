import React from 'react'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  isFullScreen?: boolean
  isMobileFullScreen?: boolean
  className?: string
}

const Container: React.FC<ContainerProps> = ({ 
  children, 
  isFullScreen = false, 
  isMobileFullScreen=false,
  className = '',
  ...props 
}) => {
  const baseClasses = isFullScreen 
    ? 'w-full'
    : `md:px-[82px] mx-auto ${isMobileFullScreen ? 'px-0' : 'px-8'}`

  const combinedClasses = `${baseClasses} ${className}`.trim()

  return (
    <div className={combinedClasses} {...props}>
      {children}
    </div>
  )
}

export default Container