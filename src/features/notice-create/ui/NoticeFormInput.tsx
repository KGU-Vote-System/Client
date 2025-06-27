import type { HTMLAttributes } from 'react';

type NoticeFormInputProps = HTMLAttributes<HTMLInputElement>;

export default function NoticeFormInput({ ...rest }: NoticeFormInputProps) {
  return (
    <input
      className="border-sl w-full rounded-md border-[1px] px-5 py-[11px] focus:outline-none"
      {...rest}
    />
  );
}
