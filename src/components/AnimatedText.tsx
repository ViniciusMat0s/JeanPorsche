type AnimatedTextProps = {
  text: string
  className?: string
  as?: 'h2' | 'h3' | 'p'
  id?: string
}

export function AnimatedText({ text, className = '', as = 'h2', id }: AnimatedTextProps) {
  const Tag = as
  return (
    <Tag className={className} id={id} data-animated-text aria-label={text}>
      {text.split(' ').map((word, index) => (
        <span className="letter-word" key={`${word}-${index}`} aria-hidden="true">
          {[...word].map((letter, letterIndex) => (
            <span className="letter" data-letter key={`${letter}-${letterIndex}`}>{letter}</span>
          ))}
        </span>
      ))}
    </Tag>
  )
}
