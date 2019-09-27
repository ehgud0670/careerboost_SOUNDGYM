import React, { useState } from "react";
import PropTypes from "prop-types";
import TrackPlayer from "react-native-track-player";
import {useTrackPlayerProgress, usePlaybackState, useTrackPlayerEvents} from "react-native-track-player/lib"
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes
} from "react-native";
import Slider from '@react-native-community/slider';


function ProgressBar() {
  const progress = useTrackPlayerProgress();
  const [seek, setSeek] = useState(0);

  _printTime=(seconds)=>{
    const minute = parseInt(seconds/60).toString().padStart(2,"0")
    const second = parseInt(seconds%60).toString().padStart(2,"0")
    return `${minute}:${second}`
  }

  return (
    <View style={styles.progress}>
      <Slider 
        style={{width: "100%", height: 10}}
        minimumValue={0}
        maximumValue={progress.duration}
        onValueChange = {val=>{
          setSeek(val);
        }}
        onSlidingComplete = { val => {
          TrackPlayer.seekTo(seek);  
        }}
        value={progress.position}
        minimumTrackTintColor="red"
        maximumTrackTintColor="#000000"/>
      <View style={styles.time}>
        <Text>{this._printTime(progress.position)}</Text>
        <Text>{this._printTime(progress.duration)}</Text>
        </View>
    </View>
  );
}

function ControlButton({ image, onPress }) {

  return (
    <TouchableOpacity style={styles.controlButtonContainer} onPress={onPress}>
      <Image style = {styles.controlButton}source ={image} />
    </TouchableOpacity>
  );
}

ControlButton.propTypes = {
  image: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired
};

export default function Player(props) {
  const playbackState = usePlaybackState();
  const [trackTitle, setTrackTitle] = useState("");
  const [trackArtwork, setTrackArtwork] = useState("");
  const [trackArtist, setTrackArtist] = useState("");
  useTrackPlayerEvents(["playback-track-changed"], async event => {
    if (event.type === TrackPlayer.TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      setTrackTitle(track.title);
      setTrackArtist(track.artist);
      setTrackArtwork(track.artwork);
    }
  });

  const { style, onNext, onPrevious, onTogglePlayback } = props;

  var playButtonImage = require("../resources/ic_play2.png");

  if (
    playbackState === TrackPlayer.STATE_PLAYING ||
    playbackState === TrackPlayer.STATE_BUFFERING
  ) {
    playButtonImage = require("../resources/ic_pause.png");
  }

  return (
    <View style={[styles.card, style]}>
      <Image style={styles.cover} source={{ uri: trackArtwork }} />
      <Text style={styles.title}>{trackTitle}</Text>
      <Text style={styles.artist}>{trackArtist}</Text>
      <View style={styles.controls}>
        <ControlButton image={require("../resources/ic_previous2.png")} onPress={onPrevious} />
        <ControlButton image={playButtonImage} onPress={onTogglePlayback} />
        <ControlButton image={require("../resources/ic_next2.png")} onPress={onNext} />
      </View>
      <ProgressBar />
    </View>
  );
}

Player.propTypes = {
  style: ViewPropTypes.style,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onTogglePlayback: PropTypes.func.isRequired
};

Player.defaultProps = {
  style: {}
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    alignItems: "center"
  },
  cover: {
    width: 415,
    height: 415
  },
  progress: {
    height: 1,
    width: "90%",
    marginTop: 15
  },
  title: {
    fontSize:20,
    marginTop: 15,
    fontWeight: "bold"
  },
  artist: {
  
  },
  controls: {
    flexDirection: "row"
  },
  controlButtonContainer: {
    flex: 1
  },
  controlButton: {
    width: 80,
    height: 80,
    alignSelf: 'center'
  },
  time: {
    fontSize:18,
    flexDirection : 'row',
    justifyContent : 'space-between',
    marginTop:5
  }
});