import clsx from 'clsx'
import { NarutoImage } from '~/assets/images'
import ImageCustom from '~/components/customs/image-custom'

const Common = () => {
  const dataCard = [
    {
      image: NarutoImage,
      name: 'Naruto',
      class: 'w-64 h-40'
    },
    {
      image: NarutoImage,
      name: 'Naruto 2',
      class: 'w-64 h-40'
    },
    {
      image: NarutoImage,
      name: 'Naruto 3',
      class: 'w-64 h-30'
    },
    {
      image: NarutoImage,
      name: 'Naruto 4',
      class: 'w-64 h-40'
    },
    {
      image: NarutoImage,
      name: 'Naruto 5',
      class: 'w-64 h-30'
    },
    {
      image: NarutoImage,
      name: 'Naruto 6',
      class: 'w-64 h-30'
    }
  ]
  return (
    <section className='grid grid-cols-5 gap-4 bg-white p-4 rounded'>
      {dataCard.map((card) => {
        return (
          <ImageCustom
            key={card.name}
            src={NarutoImage}
            alt='Naruto'
            className={clsx('rounded-lg cursor-pointer', card.class)}
          />
        )
      })}
    </section>
  )
}

export default Common
