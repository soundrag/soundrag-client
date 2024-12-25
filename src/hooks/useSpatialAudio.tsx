import { useEffect, useRef, useCallback } from "react";

import useModelStore from "../stores/useModelStore";

import { calculatePan } from "../utils/calculators";
import { isValidateNumber } from "../utils/validators";

import {
  FLOOR_POSITION,
  CEILING_POSITION,
  DEFAULT_POSITION,
} from "../constants";

const useSpatialAudio = (
  audioRef: React.MutableRefObject<HTMLAudioElement | null>,
) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  const firstPannerRef = useRef<PannerNode | null>(null);
  const secondPannerRef = useRef<PannerNode | null>(null);

  const firstStereoPannerRef = useRef<StereoPannerNode | null>(null);
  const secondStereoPannerRef = useRef<StereoPannerNode | null>(null);

  const firstBiquadFilterRef = useRef<BiquadFilterNode | null>(null);
  const secondBiquadFilterRef = useRef<BiquadFilterNode | null>(null);

  const { positions } = useModelStore((state) => ({
    positions: state.positions,
  }));

  const firstSpeakerPosition = positions["firstSpeaker"] || DEFAULT_POSITION;
  const secondSpeakerPosition = positions["secondSpeaker"] || DEFAULT_POSITION;
  const listenerPosition = positions["listener"] || DEFAULT_POSITION;

  const initAudioContext = useCallback(() => {
    if (audioContextRef.current || !audioRef.current) return;

    audioContextRef.current = new AudioContext();

    sourceRef.current = audioContextRef.current.createMediaElementSource(
      audioRef.current,
    );

    firstPannerRef.current = audioContextRef.current.createPanner();
    secondPannerRef.current = audioContextRef.current.createPanner();

    firstStereoPannerRef.current = audioContextRef.current.createStereoPanner();
    secondStereoPannerRef.current =
      audioContextRef.current.createStereoPanner();

    firstPannerRef.current.panningModel = "HRTF";
    firstPannerRef.current.distanceModel = "inverse";
    secondPannerRef.current.panningModel = "HRTF";
    secondPannerRef.current.distanceModel = "inverse";

    sourceRef.current.connect(firstPannerRef.current);
    sourceRef.current.connect(secondPannerRef.current);

    firstPannerRef.current.connect(firstStereoPannerRef.current);
    secondPannerRef.current.connect(secondStereoPannerRef.current);

    firstStereoPannerRef.current.connect(audioContextRef.current.destination);
    secondStereoPannerRef.current.connect(audioContextRef.current.destination);

    const [firstSpeakerX, firstSpeakerY, firstSpeakerZ] = firstSpeakerPosition;

    if (
      isValidateNumber(firstSpeakerX, firstSpeakerY, firstSpeakerZ) &&
      firstPannerRef.current
    ) {
      firstPannerRef.current.positionX.setValueAtTime(
        firstSpeakerX,
        audioContextRef.current.currentTime,
      );
      firstPannerRef.current.positionY.setValueAtTime(
        firstSpeakerY,
        audioContextRef.current.currentTime,
      );
      firstPannerRef.current.positionZ.setValueAtTime(
        firstSpeakerZ,
        audioContextRef.current.currentTime,
      );
    }

    const [secondSpeakerX, secondSpeakerY, secondSpeakerZ] =
      secondSpeakerPosition;
    if (
      isValidateNumber(secondSpeakerX, secondSpeakerY, secondSpeakerZ) &&
      secondPannerRef.current
    ) {
      secondPannerRef.current.positionX.setValueAtTime(
        secondSpeakerX,
        audioContextRef.current.currentTime,
      );
      secondPannerRef.current.positionY.setValueAtTime(
        secondSpeakerY,
        audioContextRef.current.currentTime,
      );
      secondPannerRef.current.positionZ.setValueAtTime(
        secondSpeakerZ,
        audioContextRef.current.currentTime,
      );
    }

    if (
      audioContextRef.current.listener &&
      isValidateNumber(...listenerPosition)
    ) {
      const listener = audioContextRef.current.listener;
      const [listenerX, listenerY, listenerZ] = listenerPosition;
      listener.positionX.setValueAtTime(
        listenerX,
        audioContextRef.current.currentTime,
      );
      listener.positionY.setValueAtTime(
        listenerY,
        audioContextRef.current.currentTime,
      );
      listener.positionZ.setValueAtTime(
        listenerZ,
        audioContextRef.current.currentTime,
      );
    }
  }, [firstSpeakerPosition, secondSpeakerPosition, listenerPosition, audioRef]);

  const startAudioContext = useCallback(async () => {
    if (
      audioContextRef.current &&
      audioContextRef.current.state === "suspended"
    ) {
      await audioContextRef.current.resume();
    }
  }, []);

  useEffect(() => {
    if (audioRef.current?.src) {
      initAudioContext();
    }
  }, [initAudioContext, audioRef.current?.src]);

  useEffect(() => {
    if (firstPannerRef.current && audioContextRef.current) {
      const [x, y, z] = firstSpeakerPosition;

      if (isValidateNumber(x, y, z)) {
        firstPannerRef.current.positionX.setValueAtTime(
          x,
          audioContextRef.current.currentTime,
        );
        firstPannerRef.current.positionY.setValueAtTime(
          y,
          audioContextRef.current.currentTime,
        );
        firstPannerRef.current.positionZ.setValueAtTime(
          z,
          audioContextRef.current.currentTime,
        );
      }

      const isAtFloor = y <= FLOOR_POSITION + 0.1;
      const isAtCeiling = y >= CEILING_POSITION - 0.1;

      if (isAtFloor || isAtCeiling) {
        if (!firstBiquadFilterRef.current) {
          firstBiquadFilterRef.current =
            audioContextRef.current.createBiquadFilter();

          if (isAtFloor) {
            firstBiquadFilterRef.current.type = "lowpass";
            firstBiquadFilterRef.current.frequency.setValueAtTime(
              1000,
              audioContextRef.current.currentTime,
            );
          } else if (isAtCeiling) {
            firstBiquadFilterRef.current.type = "highpass";
            firstBiquadFilterRef.current.frequency.setValueAtTime(
              1000,
              audioContextRef.current.currentTime,
            );
          }

          firstPannerRef.current.disconnect(firstStereoPannerRef.current);
          firstPannerRef.current.connect(firstBiquadFilterRef.current);
          firstBiquadFilterRef.current.connect(firstStereoPannerRef.current);
        } else {
          if (isAtFloor) {
            firstBiquadFilterRef.current.type = "lowpass";
            firstBiquadFilterRef.current.frequency.setValueAtTime(
              1000,
              audioContextRef.current.currentTime,
            );
          } else if (isAtCeiling) {
            firstBiquadFilterRef.current.type = "highpass";
            firstBiquadFilterRef.current.frequency.setValueAtTime(
              1000,
              audioContextRef.current.currentTime,
            );
          }
        }
      } else {
        if (firstBiquadFilterRef.current) {
          firstBiquadFilterRef.current.disconnect(firstStereoPannerRef.current);
          firstPannerRef.current.disconnect(firstBiquadFilterRef.current);
          firstPannerRef.current.connect(firstStereoPannerRef.current);

          firstBiquadFilterRef.current = null;
        }
      }
    }
  }, [firstSpeakerPosition]);

  useEffect(() => {
    if (secondPannerRef.current && audioContextRef.current) {
      const [x, y, z] = secondSpeakerPosition;

      if (isValidateNumber(x, y, z)) {
        secondPannerRef.current.positionX.setValueAtTime(
          x,
          audioContextRef.current.currentTime,
        );
        secondPannerRef.current.positionY.setValueAtTime(
          y,
          audioContextRef.current.currentTime,
        );
        secondPannerRef.current.positionZ.setValueAtTime(
          z,
          audioContextRef.current.currentTime,
        );
      }

      const isAtFloor = y <= FLOOR_POSITION + 0.1;
      const isAtCeiling = y >= CEILING_POSITION - 0.1;

      if (isAtFloor || isAtCeiling) {
        if (!secondBiquadFilterRef.current) {
          secondBiquadFilterRef.current =
            audioContextRef.current.createBiquadFilter();

          if (isAtFloor) {
            secondBiquadFilterRef.current.type = "lowpass";
            secondBiquadFilterRef.current.frequency.setValueAtTime(
              1000,
              audioContextRef.current.currentTime,
            );
          } else if (isAtCeiling) {
            secondBiquadFilterRef.current.type = "highpass";
            secondBiquadFilterRef.current.frequency.setValueAtTime(
              1000,
              audioContextRef.current.currentTime,
            );
          }

          secondPannerRef.current.disconnect(secondStereoPannerRef.current);
          secondPannerRef.current.connect(secondBiquadFilterRef.current);
          secondBiquadFilterRef.current.connect(secondStereoPannerRef.current);
        } else {
          if (isAtFloor) {
            secondBiquadFilterRef.current.type = "lowpass";
            secondBiquadFilterRef.current.frequency.setValueAtTime(
              1000,
              audioContextRef.current.currentTime,
            );
          } else if (isAtCeiling) {
            secondBiquadFilterRef.current.type = "highpass";
            secondBiquadFilterRef.current.frequency.setValueAtTime(
              1000,
              audioContextRef.current.currentTime,
            );
          }
        }
      } else {
        if (secondBiquadFilterRef.current) {
          secondBiquadFilterRef.current.disconnect(
            secondStereoPannerRef.current,
          );
          secondPannerRef.current.disconnect(secondBiquadFilterRef.current);
          secondPannerRef.current.connect(secondStereoPannerRef.current);

          secondBiquadFilterRef.current = null;
        }
      }
    }
  }, [secondSpeakerPosition]);

  useEffect(() => {
    if (
      audioContextRef.current &&
      audioContextRef.current.listener &&
      isValidateNumber(...listenerPosition)
    ) {
      const listener = audioContextRef.current.listener;
      const [x, y, z] = listenerPosition;
      listener.positionX.setValueAtTime(x, audioContextRef.current.currentTime);
      listener.positionY.setValueAtTime(y, audioContextRef.current.currentTime);
      listener.positionZ.setValueAtTime(z, audioContextRef.current.currentTime);
    }
  }, [listenerPosition]);

  useEffect(() => {
    if (
      firstStereoPannerRef.current &&
      secondStereoPannerRef.current &&
      audioContextRef.current
    ) {
      const firstPan = calculatePan(listenerPosition, firstSpeakerPosition);
      firstStereoPannerRef.current.pan.setValueAtTime(
        firstPan,
        audioContextRef.current.currentTime,
      );

      const secondPan = calculatePan(listenerPosition, secondSpeakerPosition);
      secondStereoPannerRef.current.pan.setValueAtTime(
        secondPan,
        audioContextRef.current.currentTime,
      );
    }
  }, [firstSpeakerPosition, secondSpeakerPosition, listenerPosition]);

  return { startAudioContext };
};

export default useSpatialAudio;
