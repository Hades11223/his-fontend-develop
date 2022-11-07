import React from "react";
import styled from "styled-components";

export const BoxIcon = (title, color) => (
  <svg
    width="140"
    height="111"
    viewBox="0 0 140 111"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {title && <title>{title}</title>}
    <path
      d="M13.3249 70.4267C13.3249 64.6794 13.2637 58.932 13.3638 53.1847C13.3916 51.5156 12.8853 50.6977 11.2719 50.2137C8.43993 49.368 5.65251 48.3498 2.87621 47.315C-0.0614381 46.2245 -0.762467 44.3662 0.834322 41.6678C4.93479 34.7354 9.05194 27.803 13.3193 20.9707C14.0315 19.8302 15.4113 18.8398 16.7021 18.378C33.5935 12.3025 50.5073 6.28807 67.4655 0.40165C68.9844 -0.126904 70.9985 -0.132468 72.5118 0.396086C89.6481 6.33814 106.74 12.4082 123.809 18.5338C124.894 18.9233 125.99 19.8969 126.602 20.8928C130.736 27.5916 134.753 34.3626 138.781 41.1226C140.923 44.7167 140.3 46.3636 136.305 47.7823C133.863 48.6503 131.437 49.5794 128.95 50.2804C127.214 50.7645 126.697 51.6602 126.708 53.4406C126.791 64.4735 126.675 75.5064 126.797 86.5392C126.83 89.6048 125.745 91.274 122.819 92.2921C106.128 98.1062 89.4978 104.093 72.8011 109.879C71.2043 110.435 69.0901 110.497 67.5044 109.946C50.7131 104.137 34.0052 98.1007 17.2195 92.2754C14.2652 91.2517 13.1524 89.6438 13.2637 86.5615C13.4584 81.1869 13.3249 75.8012 13.3249 70.4267ZM120.07 53.5519C118.952 53.9302 118.173 54.1862 117.4 54.4588C107.101 58.0752 96.8086 61.6972 86.5101 65.3081C82.1815 66.827 81.8199 66.6767 79.4164 62.682C76.3841 57.6357 73.3463 52.5949 70.0637 47.1481C66.7478 52.6784 63.671 57.8082 60.5887 62.9379C58.4244 66.5432 57.729 66.788 53.8733 65.4193C48.1204 63.3774 42.3675 61.3356 36.6146 59.3048C31.1622 57.3798 25.7042 55.4714 20.0848 53.4963C20.0848 64.6015 20.0848 75.3394 20.0848 86.1832C35.5353 91.6634 50.9412 97.1214 66.5697 102.663C66.6421 101.617 66.7255 100.905 66.7255 100.198C66.7366 92.2309 66.7255 84.2581 66.7366 76.2908C66.7422 74.0932 67.8327 72.6744 70.0526 72.6633C72.2725 72.6577 73.3742 74.0654 73.3964 76.263C73.4187 78.1158 73.402 79.9685 73.402 81.8212C73.402 88.6479 73.402 95.4801 73.402 102.752C89.2308 97.1326 104.687 91.6467 120.065 86.1887C120.07 75.2059 120.07 64.557 120.07 53.5519ZM8.21738 42.2019C23.6233 47.6766 38.7567 53.0734 53.9234 58.3868C54.4352 58.5648 55.5591 58.1197 55.8651 57.6301C58.9419 52.6895 61.9073 47.6766 64.9451 42.6248C64.5278 42.38 64.2441 42.1463 63.9158 42.0294C49.2109 36.7828 34.5115 31.5251 19.7677 26.3842C19.0889 26.1506 17.6256 26.7459 17.2139 27.3968C14.1873 32.1483 11.3386 37.0165 8.21738 42.2019ZM75.0043 42.4523C77.9142 47.3094 80.8017 51.9329 83.4779 56.6787C84.5127 58.5092 85.4975 58.7429 87.4281 58.0363C100.887 53.1458 114.39 48.3888 127.882 43.5873C129.139 43.1366 130.386 42.6526 131.771 42.1296C128.672 36.9609 125.673 32.0815 122.808 27.1187C121.918 25.5831 120.966 26.0949 119.803 26.5122C111.714 29.3998 103.607 32.2484 95.5178 35.1249C88.7356 37.5395 81.959 39.9709 75.0043 42.4523ZM73.4966 35.9705C86.7994 31.2302 99.7128 26.6346 112.621 22.039C112.621 21.8331 112.626 21.6328 112.626 21.427C99.6572 16.8146 86.6937 12.2079 73.4966 7.51765C73.4966 17.154 73.4966 26.3064 73.4966 35.9705Z"
      fill="white"
    />
    <path
      d="M13.3249 70.4267C13.3249 64.6794 13.2637 58.932 13.3638 53.1847C13.3916 51.5156 12.8853 50.6977 11.2719 50.2137C8.43993 49.368 5.65251 48.3498 2.87621 47.315C-0.0614381 46.2245 -0.762467 44.3662 0.834322 41.6678C4.93479 34.7354 9.05194 27.803 13.3193 20.9707C14.0315 19.8302 15.4113 18.8398 16.7021 18.378C33.5935 12.3025 50.5073 6.28807 67.4655 0.40165C68.9844 -0.126904 70.9985 -0.132468 72.5118 0.396086C89.6481 6.33814 106.74 12.4082 123.809 18.5338C124.894 18.9233 125.99 19.8969 126.602 20.8928C130.736 27.5916 134.753 34.3626 138.781 41.1226C140.923 44.7167 140.3 46.3636 136.305 47.7823C133.863 48.6503 131.437 49.5794 128.95 50.2804C127.214 50.7645 126.697 51.6602 126.708 53.4406C126.791 64.4735 126.675 75.5064 126.797 86.5392C126.83 89.6048 125.745 91.274 122.819 92.2921C106.128 98.1062 89.4978 104.093 72.8011 109.879C71.2043 110.435 69.0901 110.497 67.5044 109.946C50.7131 104.137 34.0052 98.1007 17.2195 92.2754C14.2652 91.2517 13.1524 89.6438 13.2637 86.5615C13.4584 81.1869 13.3249 75.8012 13.3249 70.4267ZM120.07 53.5519C118.952 53.9302 118.173 54.1862 117.4 54.4588C107.101 58.0752 96.8086 61.6972 86.5101 65.3081C82.1815 66.827 81.8199 66.6767 79.4164 62.682C76.3841 57.6357 73.3463 52.5949 70.0637 47.1481C66.7478 52.6784 63.671 57.8082 60.5887 62.9379C58.4244 66.5432 57.729 66.788 53.8733 65.4193C48.1204 63.3774 42.3675 61.3356 36.6146 59.3048C31.1622 57.3798 25.7042 55.4714 20.0848 53.4963C20.0848 64.6015 20.0848 75.3394 20.0848 86.1832C35.5353 91.6634 50.9412 97.1214 66.5697 102.663C66.6421 101.617 66.7255 100.905 66.7255 100.198C66.7366 92.2309 66.7255 84.2581 66.7366 76.2908C66.7422 74.0932 67.8327 72.6744 70.0526 72.6633C72.2725 72.6577 73.3742 74.0654 73.3964 76.263C73.4187 78.1158 73.402 79.9685 73.402 81.8212C73.402 88.6479 73.402 95.4801 73.402 102.752C89.2308 97.1326 104.687 91.6467 120.065 86.1887C120.07 75.2059 120.07 64.557 120.07 53.5519ZM8.21738 42.2019C23.6233 47.6766 38.7567 53.0734 53.9234 58.3868C54.4352 58.5648 55.5591 58.1197 55.8651 57.6301C58.9419 52.6895 61.9073 47.6766 64.9451 42.6248C64.5278 42.38 64.2441 42.1463 63.9158 42.0294C49.2109 36.7828 34.5115 31.5251 19.7677 26.3842C19.0889 26.1506 17.6256 26.7459 17.2139 27.3968C14.1873 32.1483 11.3386 37.0165 8.21738 42.2019ZM75.0043 42.4523C77.9142 47.3094 80.8017 51.9329 83.4779 56.6787C84.5127 58.5092 85.4975 58.7429 87.4281 58.0363C100.887 53.1458 114.39 48.3888 127.882 43.5873C129.139 43.1366 130.386 42.6526 131.771 42.1296C128.672 36.9609 125.673 32.0815 122.808 27.1187C121.918 25.5831 120.966 26.0949 119.803 26.5122C111.714 29.3998 103.607 32.2484 95.5178 35.1249C88.7356 37.5395 81.959 39.9709 75.0043 42.4523ZM73.4966 35.9705C86.7994 31.2302 99.7128 26.6346 112.621 22.039C112.621 21.8331 112.626 21.6328 112.626 21.427C99.6572 16.8146 86.6937 12.2079 73.4966 7.51765C73.4966 17.154 73.4966 26.3064 73.4966 35.9705Z"
      fill={color || "#172B4D"}
      fillOpacity="0.25"
    />
  </svg>
);

export const EmptyChartStyled = styled.div`
  width: 100%;
  height: 100%;
  min-height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 4em;
  .text-1 {
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    color: #7a869a;
    margin-top: 1em;
  }
  .text-2 {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    color: #7a869a;
    margin-top: 1em;
  }
`;
