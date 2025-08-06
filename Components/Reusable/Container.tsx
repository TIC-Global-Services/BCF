import React from 'react'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  isFullScreen?: boolean
  className?: string
}

const Container: React.FC<ContainerProps> = ({ 
  children, 
  isFullScreen = false, 
  className = '',
  ...props 
}) => {
  const baseClasses = isFullScreen 
    ? 'w-full'
    : 'px-[82px] mx-auto'

  const combinedClasses = `${baseClasses} ${className}`.trim()

  return (
    <div className={combinedClasses} {...props}>
      {children}
    </div>
  )
}

export default Container