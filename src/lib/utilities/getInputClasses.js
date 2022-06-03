const themeClasses = {
  color: {
    blue: 'bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-600 focus:ring-blue-500/[.3]',
    'color-scheme':
      'ring-offset-1 ring-offset-gray-400 dark:ring-offset-gray-600 bg-gray-50 text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:ring-blue-500/[.3] dark:bg-gray-900 dark:text-gray-50 dark:hover:bg-gray-800 dark:focus:bg-gray-800',
    error: 'bg-red-500 text-white hover:bg-red-600 focus:bg-red-600 focus:ring-red-500/[.3]',
    red: 'bg-red-500 text-white hover:bg-red-600 focus:bg-red-600 focus:ring-red-500/[.3]'
  },
  rounded: {
    false: '',
    true: 'rounded-[.5rem]'
  },
  size: {
    icon: 'p-[.75rem]',
    normal: 'px-[1.5rem] py-[.75rem]'
  }
};

export default ({ color = 'blue', disabled = false, rounded = true, size = 'normal' }) =>
  `outline-none ring ring-transparent transition duration-200 ${themeClasses.color[color]} ${themeClasses.rounded[rounded]} ${themeClasses.size[size]}`;
