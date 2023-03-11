import { ComponentType, Suspense } from 'react';
import { Center, Spinner, SpinnerProps } from '@chakra-ui/react';

export const withSuspense = <P extends object>(
  Component: ComponentType<P>,
  spinnerProps: SpinnerProps = {},
) => (
    (props: P) => (
      <Suspense
        fallback={(
          <Center>
            <Spinner {...spinnerProps} />
          </Center>
        )}
      >
        <Component {...props} />
      </Suspense>
    )
  );
