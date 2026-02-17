import { Link } from 'react-router-dom'

export default function Button({ children, to, href, onClick, variant = 'outline', className = '' }) {
  const base =
    'inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium tracking-wide transition-all duration-300 cursor-pointer'
  const variants = {
    outline:
      'border border-accent text-accent hover:bg-accent-muted hover:border-accent-hover hover:text-accent-hover',
    filled:
      'bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent-glow hover:shadow-accent-glow/50',
  }

  const classes = `${base} ${variants[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
