import Image from "next/image";
import React from "react";
import AngledContentStripe from "../AngledContentStripe";
import Button from "../Button/Button";

const Hero = () => {
  return (
    <div className="m-auto">
      <Button type="button">Connect Wallet</Button>
      <div className="flex min-h-[18rem] justify-center bg-robinEggBlue">
        <h2 className="rotate-[-3.7deg] text-[8rem] text-champagne">
          <span className="drop-shadow-title">Sitting</span>{" "}
          <span className="relative">
            <span className="drop-shadow-title">Cats</span>{" "}
            <span className="absolute -right-6 top-10 font-sans text-base font-bold text-wenge">
              NFT
            </span>
          </span>
        </h2>
      </div>
      <AngledContentStripe color="yellow">
        <div className="flex px-5 py-4">
          <figure className="h-full w-10 min-w-[8rem] shrink-0 grow">
            <Image
              className="absolute -top-24"
              alt="cat"
              width="110"
              height="100"
              src="/hero-cat.png"
            />
          </figure>
          <p className="text-md max-w-[70%]  shrink-0 grow">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived
            not only ...
          </p>
        </div>
      </AngledContentStripe>
    </div>
  );
};

export default Hero;
