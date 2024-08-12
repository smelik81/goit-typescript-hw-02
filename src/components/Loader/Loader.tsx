import { Blocks } from 'react-loader-spinner';

export interface LoaderProps {
  loading: boolean;
}

const Loader: React.FC<LoaderProps> = () => {
  return (
    <>
      <Blocks
        height='80'
        width='80'
        color='#4fa94d'
        ariaLabel='blocks-loading'
        wrapperStyle={{}}
        wrapperClass='blocks-wrapper'
        visible={true}
      />
    </>
  );
};

export default Loader;
