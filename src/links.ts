import pdf from '../public/icons/pdf.svg'
import imgresize from '../public/icons/imgresize.svg'
import speech from '../public/icons/speech.svg'
import removebg from '../public/icons/removebg.svg'

type SocialMedia = (typeof websites)[number]

type Link = {
  title: string
  icon: any
  link: string
  text?: string
}

const websites = [
  'behance',
  'buymeacoffee',
]

const LINKS: { [key in SocialMedia]: Link } = {
  removebg: {
    title: 'Remove Background',
    icon: removebg,
    link: '/removebg',
  },
  imgresize: {
    title: 'Resize Image',
    icon: imgresize,
    link: '/imgresize',
  },
  speechtotext: {
    title: 'Speech to Text',
    icon: speech,
    link: '/speechtotext',
  },
  wordtopdf: {
    title: 'Word to PDF',
    icon: pdf,
    link: '/wordtopdf',
  },
}

export default LINKS
