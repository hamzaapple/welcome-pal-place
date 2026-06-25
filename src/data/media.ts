// Auto-wired video + thumbnail URLs from Lovable Assets CDN.
import ad1V from "@/assets/videos/ad-1.mp4.asset.json";
import ad1T from "@/assets/thumbs/ad-1.jpg.asset.json";

import ar1V from "@/assets/videos/arabic-1.mp4.asset.json";
import ar2V from "@/assets/videos/arabic-2.mp4.asset.json";
import ar3V from "@/assets/videos/arabic-3.mp4.asset.json";
import ar4V from "@/assets/videos/arabic-4.mp4.asset.json";
import ar1T from "@/assets/thumbs/arabic-1.jpg.asset.json";
import ar2T from "@/assets/thumbs/arabic-2.jpg.asset.json";
import ar3T from "@/assets/thumbs/arabic-3.jpg.asset.json";
import ar4T from "@/assets/thumbs/arabic-4.jpg.asset.json";

import car1V from "@/assets/videos/car-1.mp4.asset.json";
import car1T from "@/assets/thumbs/car-1.jpg.asset.json";

import en1V from "@/assets/videos/english-1.mp4.asset.json";
import en2V from "@/assets/videos/english-2.mp4.asset.json";
import en3V from "@/assets/videos/english-3.mp4.asset.json";
import en4V from "@/assets/videos/english-4.mp4.asset.json";
import en1T from "@/assets/thumbs/english-1.jpg.asset.json";
import en2T from "@/assets/thumbs/english-2.jpg.asset.json";
import en3T from "@/assets/thumbs/english-3.jpg.asset.json";
import en4T from "@/assets/thumbs/english-4.jpg.asset.json";

import s1V from "@/assets/videos/short-1.mp4.asset.json";
import s2V from "@/assets/videos/short-2.mp4.asset.json";
import s3V from "@/assets/videos/short-3.mp4.asset.json";
import s4V from "@/assets/videos/short-4.mp4.asset.json";
import s5V from "@/assets/videos/short-5.mp4.asset.json";
import s6V from "@/assets/videos/short-6.mp4.asset.json";
import s7V from "@/assets/videos/short-7.mp4.asset.json";
import s1T from "@/assets/thumbs/short-1.jpg.asset.json";
import s2T from "@/assets/thumbs/short-2.jpg.asset.json";
import s3T from "@/assets/thumbs/short-3.jpg.asset.json";
import s4T from "@/assets/thumbs/short-4.jpg.asset.json";
import s5T from "@/assets/thumbs/short-5.jpg.asset.json";
import s6T from "@/assets/thumbs/short-6.jpg.asset.json";
import s7T from "@/assets/thumbs/short-7.jpg.asset.json";

export const adsVideos = [
  { title: "Ad Campaign", desc: "Commercial video editing", tag: "Ads", thumb: ad1T.url, videoSrc: ad1V.url },
];

export const arabicVideos = [
  { title: "Arabic Project 1", desc: "Arabic content editing", tag: "Arabic", thumb: ar1T.url, videoSrc: ar1V.url },
  { title: "Arabic Project 2", desc: "Arabic content editing", tag: "Arabic", thumb: ar2T.url, videoSrc: ar2V.url },
  { title: "Arabic Project 3", desc: "Arabic content editing", tag: "Arabic", thumb: ar3T.url, videoSrc: ar3V.url },
  { title: "Arabic Project 4", desc: "Arabic content editing", tag: "Arabic", thumb: ar4T.url, videoSrc: ar4V.url },
];

export const carVideos = [
  { title: "Automotive Edit", desc: "Cinematic car videography", tag: "Cars", thumb: car1T.url, videoSrc: car1V.url },
];

export const englishVideos = [
  { title: "English Project 1", desc: "English content editing", tag: "English", thumb: en1T.url, videoSrc: en1V.url },
  { title: "English Project 2", desc: "English content editing", tag: "English", thumb: en2T.url, videoSrc: en2V.url },
  { title: "English Project 3", desc: "English content editing", tag: "English", thumb: en3T.url, videoSrc: en3V.url },
  { title: "English Project 4", desc: "English content editing", tag: "English", thumb: en4T.url, videoSrc: en4V.url },
];

export const shortsList = [
  { label: "Short", title: "Reel 1", src: s1V.url, thumb: s1T.url },
  { label: "Reel",  title: "Reel 2", src: s2V.url, thumb: s2T.url },
  { label: "Short", title: "Reel 3", src: s3V.url, thumb: s3T.url },
  { label: "Reel",  title: "Reel 4", src: s4V.url, thumb: s4T.url },
  { label: "Short", title: "Reel 5", src: s5V.url, thumb: s5T.url },
  { label: "Reel",  title: "Reel 6", src: s6V.url, thumb: s6T.url },
  { label: "Short", title: "Reel 7", src: s7V.url, thumb: s7T.url },
];
