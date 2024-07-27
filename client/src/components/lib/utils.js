import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
};

// encodeURIComponent will take in a string and return a URL-encoded string
export function encodeURIComponent (text) {
  return encodeURIComponent(text);
};

export function json (context) {
  return JSON.stringify(context);
};

export function prepPictureUrl (picture) {
  console.log(`PICTURE: '${picture}'`);
  picture = picture.replace(/\\/g, '/');
  // if (picture.startsWith('/')) {
  //     picture = picture.slice(1);
  // }
  if (/^https?:\/\//.test(picture)) {
      console.log(`PICTURE AFTER: '${picture}'`);
      return picture;
  } else if (picture.startsWith('upload/images/')) {
      picture = '/' + picture.replace('//upload/images/upload/images/', 'upload/images/');

  } else if (picture.startsWith('/upload/images/upload/images/')) {
      picture = picture.replace('/upload/images/upload/images/', '/upload/images/');
  }
  else if (!picture.startsWith('/upload/images/')) {
      // Split by '/upload/images/' and join back together with only one '/upload/images/' in between
      picture = '/upload/images/' + picture;

  } 
  console.log(`PICTURE AFTER: '${picture}'`);
  return picture;
};
