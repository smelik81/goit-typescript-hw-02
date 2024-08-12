import { FormEvent, ReactElement, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import css from './SearchBar.module.css';
import { FaMagnifyingGlass } from 'react-icons/fa6';

export type SearchBarType = {
  onSubmit: (value: string) => void;
};

export default function SearchBar({ onSubmit }: SearchBarType): ReactElement {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!searchQuery.trim()) {
      toast.error('Incorrect request, field can`t be empty', {
        style: {
          fontSize: '28px',
        },
      });
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(event.target.value.trim());

  return (
    <header className={css.wrapper}>
      <form onSubmit={handleSubmit} className={css.container}>
        <input
          className={css.input}
          type='text'
          autoComplete='off'
          autoFocus
          placeholder='Search images and photos'
          value={searchQuery}
          onChange={handleChange}
        />
        <button type='submit' className={css.buttonSubmit}>
          <FaMagnifyingGlass size='24px' />
        </button>
      </form>
      <Toaster />
    </header>
  );
}
