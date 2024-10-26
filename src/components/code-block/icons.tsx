"use client";

import { memo } from "react";

type IconProps = {
  className?: string;
  size?: number;
};

const DEFAULT_ICON_SIZE = 16;

export const SqlLogo = memo(
  ({ className = "", size = DEFAULT_ICON_SIZE }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#fff"
      fillRule="evenodd"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 61 81"
      className={className}
      width={size}
      height={size}
    >
      <use x="0.5" y="0.5" xlinkHref="#A" />
      <symbol id="A" overflow="visible">
        <g fill="#0072c6" stroke="none">
          <path d="M0 10.929v58.14C0 75.106 13.432 80 30 80V10.929H0z" />
          <use xlinkHref="#C" />
        </g>
        <use stroke="none" opacity="0.15" xlinkHref="#C" />
        <path
          stroke="none"
          d="M60 10.929c0 6.036-13.432 10.929-30 10.929S0 16.965 0 10.929 13.432 0 30 0s30 4.893 30 10.929"
        />
        <path
          fill="#7fba00"
          stroke="none"
          d="M53.866 10.299c0 3.985-10.685 7.211-23.866 7.211S6.132 14.284 6.132 10.299 16.819 3.088 30 3.088s23.866 3.228 23.866 7.211"
        />
        <path
          fill="#b8d432"
          stroke="none"
          d="M48.867 14.707c3.124-1.219 5.002-2.745 5.002-4.404C53.868 6.318 43.183 3.09 30 3.09S6.134 6.318 6.134 10.303c0 1.658 1.877 3.185 5.002 4.404 4.363-1.704 11.182-2.803 18.865-2.803s14.5 1.099 18.866 2.803"
        />
      </symbol>
      <defs>
        <path
          id="C"
          d="M29.589 79.999H30c16.568 0 30-4.892 30-10.929V10.93H29.589V80z"
        />
      </defs>
    </svg>
  ),
);

export const RustIcon = memo(
  ({ className = "", size = DEFAULT_ICON_SIZE }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`svg-icon ${className}`}
      width={size}
      height={size}
      fill="currentColor"
      overflow="hidden"
      viewBox="0 0 1024 1024"
    >
      <path
        fill="#FF7043"
        d="M485.348 186.36a25.323 25.323 0 0150.652 0 25.323 25.323 0 01-50.652 0M183.225 415.66a25.323 25.323 0 0150.652 0 25.323 25.323 0 01-50.652 0m604.231 1.18a25.323 25.323 0 0150.652 0 25.323 25.323 0 01-50.652 0m-530.923 34.702a23.125 23.125 0 0011.74-30.506l-11.235-25.415h44.189v199.182h-89.152a311.8 311.8 0 01-10.098-119.026z"
      />
    </svg>
  ),
);

export const JavascriptIcon = memo(
  ({ className, size = DEFAULT_ICON_SIZE }: IconProps) => (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" fill="#f7df1e" />
      <path
        d="M9 18.5v1c.8 1.5 2.1 2.4 4 2.4 2.3 0 3.8-1.3 3.8-3.2 0-2-1.3-2.8-3.5-3.7l-.8-.3c-1.2-.5-1.7-.8-1.7-1.6 0-.7.5-1.2 1.3-1.2.8 0 1.3.3 1.8 1.1l2.1-1.3c-.9-1.6-2.1-2.2-3.9-2.2-2.4 0-4 1.5-4 3.4 0 2.1 1.3 3.1 3.2 3.9l.8.3c1.2.6 2 .9 2 1.8 0 .8-.7 1.3-1.9 1.3-1.4 0-2.2-.7-2.8-1.7L9 18.5zm9.9 3.8V13h-2.6v9.3h2.6z"
        fill="#000000"
      />
    </svg>
  ),
);

export const TypescriptIcon = memo(
  ({ className, size = DEFAULT_ICON_SIZE }: IconProps) => (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="3" fill="#3178c6" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.646 25.484v3.128c.509.261 1.11.456 1.804.587.694.13 1.424.196 2.19.196.75 0 1.462-.072 2.137-.215.675-.144 1.267-.38 1.776-.71.509-.329.911-.759 1.208-1.29.297-.532.445-.999.445-1.766 0-.567-.085-1.064-.254-1.491-.17-.428-.414-.807-.734-1.14-.32-.332-.703-.63-1.149-.894-.446-.264-.95-.513-1.511-.748-.41-.17-.78-.334-1.105-.494a4.047 4.047 0 01-.832-.489 2.224 2.224 0 01-.528-.528c-.124-.186-.186-.396-.186-.631 0-.215.055-.409.166-.582a1.41 1.41 0 01.47-.445c.202-.124.45-.22.743-.289.293-.068.62-.103.978-.103.26 0 .536.02.826.059.29.039.582.1.876.181a6.094 6.094 0 01.856.308c.277.124.533.267.768.43v-2.922c-.476-.183-.997-.318-1.56-.406a9.455 9.455 0 00-1.713-.132c-.743 0-1.447.08-2.112.24-.665.159-1.25.409-1.756.747-.505.339-.904.771-1.198 1.296-.293.525-.44 1.152-.44 1.882 0 .932.269 1.727.807 2.385.538.658 1.354 1.216 2.45 1.672.43.176.83.349 1.203.518.373.17.693.346.963.528.27.183.484.382.64.597.157.215.235.46.235.733 0 .202-.043.391-.127.568a1.224 1.224 0 01-.37.462c-.161.13-.368.234-.62.311-.252.077-.558.116-.916.116-.338 0-.662-.027-.972-.08a7.326 7.326 0 01-.872-.2 3.344 3.344 0 01-.748-.328v3.021z"
        fill="#ffffff"
      />
      <path
        d="M12.465 13h-5.93v2.186h1.646v9.328h-1.646V27h7.576v-2.486h-1.646v-9.328h1.646V13z"
        fill="#ffffff"
      />
    </svg>
  ),
);

export const PythonIcon = memo(
  ({ className, size = DEFAULT_ICON_SIZE }: IconProps) => (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="3" fill="#306998" />
      <path
        d="M7 12.2c0-1.8 1.4-3.2 3.2-3.2h4.7v2.8h-4.7c-.3 0-.6.2-.6.6v4.1c0 .3.2.6.6.6h8.8c1.8 0 3.2-1.4 3.2-3.2v-3.5c0-1.8-1.4-3.2-3.2-3.2h-1.7V5h-5.9c-3 0-5.4 2.4-5.4 5.4v1.8h2.8V12.2zm5.6-5.6c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z"
        fill="#ffffff"
      />
      <path
        d="M25 19.8c0 1.8-1.4 3.2-3.2 3.2h-4.7v-2.8h4.7c.3 0 .6-.2.6-.6v-4.1c0-.3-.2-.6-.6-.6H13.5c-1.8 0-3.2 1.4-3.2 3.2v3.5c0 1.8 1.4 3.2 3.2 3.2h1.7V27h5.9c3 0 5.4-2.4 5.4-5.4v-1.8H25v-.9zm-5.6 5.6c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z"
        fill="#ffffff"
      />
    </svg>
  ),
);
