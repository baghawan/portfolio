"use client";

import Anchor from "@/components/ui/Anchor";

interface ExtendedError extends Error {
  digest?: string;
  status?: number;
  payload?: Record<string, unknown> | null;
}

export default function Error({ error }: { error: ExtendedError }) {
  return (
    <div className='flex min-h-[80dvh] items-center justify-center'>
      <div className='max-w-xl w-full rounded-lg bg-white p-8 shadow-sm'>
        <div className='flex items-start'>
          <div className='flex-shrink-0'>
            <svg
              className='h-8 w-8 text-red-400'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z'
              />
            </svg>
          </div>

          <div className='ml-3 flex-1'>
            <h3 className='text-sm font-medium text-gray-800'>
              {error.status === 404
                ? "Content not found"
                : "Something went wrong!"}
            </h3>

            <div className='mt-2 text-sm text-gray-500'>
              <p>
                {error.status === 404
                  ? "The requested resource could not be found."
                  : "We encountered an unexpected error. Please try again."}
              </p>
            </div>

            <div className='mt-3 space-y-2'>
              <div>
                <span className='text-xs font-medium text-gray-700'>
                  Error Type:
                </span>
                <p className='text-xs font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded'>
                  {error.constructor.name}
                </p>
              </div>

              <div>
                <span className='text-xs font-medium text-gray-700'>
                  Error Message:
                </span>
                <p className='text-xs font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded break-all'>
                  {error.message}
                </p>
              </div>

              {error.status && (
                <div>
                  <span className='text-xs font-medium text-gray-700'>
                    HTTP Status:
                  </span>
                  <p className='text-xs font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded'>
                    {error.status}
                  </p>
                </div>
              )}

              {error.digest && (
                <div>
                  <span className='text-xs font-medium text-gray-700'>
                    Error Code:
                  </span>
                  <p className='text-xs font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded'>
                    {error.digest}
                  </p>
                </div>
              )}

              {error.payload && (
                <details className='mt-2 text-xs bg-gray-50 p-2 rounded'>
                  <summary className='cursor-pointer text-gray-600'>
                    Server Payload
                  </summary>
                  <pre className='whitespace-pre-wrap break-all'>
                    {JSON.stringify(error.payload, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>

        <div className='mt-4'>
          <div className='flex justify-center'>
            <Anchor
              href='/'
              variant='muted'
              className='bg-(--color-foreground) text-(--color-background) px-4 py-2 text-base font-medium rounded-lg'
            >
              Back to Home
            </Anchor>
          </div>
        </div>
      </div>
    </div>
  );
}
