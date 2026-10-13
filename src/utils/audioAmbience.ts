/**
 * Synthesizes gentle cafe room warmth and vinyl crackle using Web Audio API.
 * Muted by default. Zero external network assets required.
 */
class CafeSoundscape {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private noiseNode: AudioNode | null = null;
  private gainNode: GainNode | null = null;

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  private start() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Generate gentle warm pink noise with occasional vinyl ticks
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // 1-pole filter to get brown/pink noise
        lastOut = (lastOut + 0.02 * white) / 1.02;
        data[i] = lastOut * 0.12;

        // Rare soft vinyl dust clicks
        if (Math.random() < 0.0004) {
          data[i] += (Math.random() - 0.5) * 0.15;
        }
      }

      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = buffer;
      noiseSource.loop = true;

      // Filter: warm low pass to emulate cafe warmth
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 450;

      // Gentle gain
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.gainNode.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + 1.2);

      noiseSource.connect(filter);
      filter.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);

      noiseSource.start();
      this.noiseNode = noiseSource;
      this.isPlaying = true;
    } catch {
      this.isPlaying = false;
    }
  }

  private stop() {
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
      setTimeout(() => {
        try {
          if (this.noiseNode && 'stop' in this.noiseNode) {
            (this.noiseNode as AudioBufferSourceNode).stop();
          }
        } catch {
          // ignore
        }
        this.isPlaying = false;
      }, 550);
    } else {
      this.isPlaying = false;
    }
  }
}

export const cafeSoundscape = new CafeSoundscape();
