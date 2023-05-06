export function BackgroundGradient({ className }) {
  return (
    <div
      className={'bg-gradient-to-b from-primary-600 to-primary-400' + (className ? ' ' + className : '')}
    />
  );
}