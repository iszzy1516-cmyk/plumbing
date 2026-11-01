// Lucide no longer ships brand marks, so these are drawn here.
const icons: Record<string, React.ReactNode> = {
  Instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.3" cy="6.7" r="1.3" fill="currentColor" />
    </>
  ),
  TikTok: (
    <path
      fill="currentColor"
      d="M16.6 2h-3.3v13.6a2.9 2.9 0 1 1-2.1-2.8V9.4a6.2 6.2 0 1 0 5.4 6.2V8.7A7.6 7.6 0 0 0 21 10.2V6.9a4.4 4.4 0 0 1-4.4-4.9Z"
    />
  ),
  Facebook: (
    <path
      fill="currentColor"
      d="M13.6 22v-8.6h2.9l.5-3.4h-3.4V7.9c0-1 .3-1.7 1.7-1.7H17V3.2c-.4-.1-1.4-.2-2.6-.2-2.6 0-4.3 1.6-4.3 4.5V10H7.2v3.4h2.9V22h3.5Z"
    />
  ),
};

export function SocialIcon({ name, className }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} width="20" height="20" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}
