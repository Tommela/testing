import React, { useState } from 'react'

import clsx from 'clsx'
import { LoadingImage } from '~/assets/images'

interface IImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  isDisabled?: boolean
}

const ImageCustom = ({ isDisabled = false, className, ...rest }: IImageProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  return (
    <section className='relative'>
      {!isError && (
        <img
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsError(true)
            setIsLoading(false)
          }}
          loading='lazy'
          className={clsx(className, isLoading && 'invisible')}
          {...rest}
        />
      )}

      {isLoading && (
        <img src={LoadingImage} alt='loading' className={clsx('absolute inset-0 object-cover', className)} />
      )}

      {isError && <img src={LoadingImage} alt='fallback' className={clsx('object-cover', className)} />}
    </section>
  )
}

export default ImageCustom
