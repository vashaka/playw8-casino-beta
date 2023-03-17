function VideoPlayer() {
  return (
    <video width="640" height="360" autoPlay muted>
      <source src="/videos/my-video.mp4" type="video/mp4" />
    </video>
  );
}

export default VideoPlayer;
