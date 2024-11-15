import { useEffect, useRef } from "react";

import useAudioStore from "../stores/useAudioStore";
import useModelStore from "../stores/useModelStore";

import { calculatePan } from "../utils/calculators";
import { isValidateNumber, hasCurrentRef } from "../utils/validators";

import {
  FLOOR_POSITION,
  CEILING_POSITION,
  DEFAULT_POSITION,
} from "../constants";

const useSpatialAudio = (audioRef) => {
  const audioContextRef = useRef(null);
  const sourceRef = useRef(null);

  const firstPannerRef = useRef(null);
  const secondPannerRef = useRef(null);

  const firstStereoPannerRef = useRef(null);
  const secondStereoPannerRef = useRef(null);

  const firstBiquadFilterRef = useRef(null);
  const secondBiquadFilterRef = useRef(null);

  const { isPlaying } = useAudioStore();
  const { positions } = useModelStore((state) => ({
    positions: state.positions,
  }));

  const firstSpeakerPosition = positions["firstSpeaker"] || DEFAULT_POSITION;
  const secondSpeakerPosition = positions["secondSpeaker"] || DEFAULT_POSITION;
  const listenerPosition = positions["listener"] || DEFAULT_POSITION;

  const hasNotAudioContext = !hasCurrentRef(audioContextRef);

  const hasPannerNodeFirstSpeaker =
    hasCurrentRef(firstPannerRef) && hasCurrentRef(audioContextRef);
  const hasPannerNodeSecondSpeaker =
    hasCurrentRef(secondPannerRef) && hasCurrentRef(audioContextRef);
  const hasStereoPannerNodeAll =
    hasCurrentRef(firstStereoPannerRef) &&
    hasCurrentRef(secondStereoPannerRef) &&
    hasCurrentRef(audioContextRef);

  const hasListener =
    hasCurrentRef(audioContextRef) && hasCurrentRef(audioContextRef).listener;

  const startAudioContext = async () => {
    if (hasNotAudioContext) {
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();

      sourceRef.current = audioContextRef.current.createMediaElementSource(
        audioRef.current,
      );

      firstPannerRef.current = audioContextRef.current.createPanner();
      secondPannerRef.current = audioContextRef.current.createPanner();

      firstStereoPannerRef.current =
        audioContextRef.current.createStereoPanner();
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
      secondStereoPannerRef.current.connect(
        audioContextRef.current.destination,
      );
    }

    if (audioContextRef.current.state === "suspended") {
      await audioContextRef.current.resume();
    }
  };

  useEffect(() => {
    if (hasPannerNodeFirstSpeaker) {
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
  }, [firstSpeakerPosition, isPlaying]);

  useEffect(() => {
    if (hasPannerNodeSecondSpeaker) {
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
  }, [secondSpeakerPosition, isPlaying]);

  useEffect(() => {
    if (hasListener) {
      const listener = audioContextRef.current.listener;
      const [x, y, z] = listenerPosition;

      if (isValidateNumber(x, y, z)) {
        listener.positionX.setValueAtTime(
          x,
          audioContextRef.current.currentTime,
        );
        listener.positionY.setValueAtTime(
          y,
          audioContextRef.current.currentTime,
        );
        listener.positionZ.setValueAtTime(
          z,
          audioContextRef.current.currentTime,
        );
      } else {
        listener.positionX = x;
        listener.positionY = y;
        listener.positionZ = z;
      }
    }
  }, [listenerPosition, isPlaying]);

  useEffect(() => {
    if (hasStereoPannerNodeAll) {
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
  }, [
    firstSpeakerPosition,
    secondSpeakerPosition,
    listenerPosition,
    isPlaying,
  ]);

  return { startAudioContext };
};

export default useSpatialAudio;
