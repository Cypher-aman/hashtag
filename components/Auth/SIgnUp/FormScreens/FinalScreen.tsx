import LoadingSpinner from '@/components/Skeletons/LoadingSpinner';
import React from 'react';

interface FinalScreenProps {
  accountCreated: boolean;
  loading: boolean;
}

const FinalScreen: React.FC<FinalScreenProps> = (props) => {
  const { accountCreated, loading } = props;

  if (loading) {
    return (
      <div className="w-full h-full py-10 min-h-[300px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="w-full min-h-[300px] flex flex-col justify-center items-center">
      {accountCreated ? (
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-[300px] py-4 ">
            <iframe
              src="https://giphy.com/embed/3oz9ZE2Oo9zRC"
              width="300"
              height="150"
              className="giphy-embed"
              allowFullScreen
            ></iframe>
            <p>
              <a
                className="text-xs"
                href="https://giphy.com/gifs/share-discover-congratulations-3oz9ZE2Oo9zRC"
              >
                via GIPHY
              </a>
            </p>
          </div>
          <div className="w-full authpage-title text-center">
            <h1 className="text-xl font-semibold text-green-500">
              Your account has been created
            </h1>
            <p>Now, you can login using your email and password </p>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-[300px] py-4 ">
            <iframe
              src="https://giphy.com/embed/FYUnDtud95kMKCovAY"
              width="300"
              height="250"
              className="giphy-embed"
              allowFullScreen
            ></iframe>
            <p>
              <a
                className="text-xs"
                href="https://giphy.com/gifs/share-discover-congratulations-3oz9ZE2Oo9zRC"
              >
                via GIPHY
              </a>
            </p>
          </div>
          <div className="w-full authpage-title text-center">
            <h1 className="text-xl font-semibold text-red-500">
              Something went wrong
            </h1>
            <p>It&apos;s not you, it&apos;s us. Please try again</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinalScreen;
