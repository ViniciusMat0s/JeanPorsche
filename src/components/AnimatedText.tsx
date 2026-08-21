type AnimatedTextProps = {
  text: string
  className?: string
  as?: 'h2' | 'h3' | 'p'
}

export function AnimatedText({ text, className = '', as = 'h2' }: AnimatedTextProps) {
  const Tag = as
  return (
    <Tag className={className} data-animated-text>
      {text.split(' ').map((word, index) => (
        <span className="word-mask" key={`${word}-${index}`}>
          <span data-word>{word}&nbsp;</span>
        </span>
      ))}
    </Tag>
  )
}
