/**
 * Gentle Christmas Music Synthesizer
 * Uses Web Audio API to create authentic, soothing acoustic music-box & celeste chime tones.
 * Zero external network requests, zero CORS issues, 100% reliable in all browsers.
 */

// Note frequencies (Hz)
const NOTE_FREQS: Record<string, number> = {
  'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'B3': 246.94,
  'C4': 261.63, 'D4': 293.66, 'Eb4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00,
  'Ab4': 415.30, 'A4': 440.00, 'Bb4': 466.16, 'B4': 493.88,
  'C5': 523.25, 'D5': 587.33, 'Eb5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'G5': 783.99,
  'Ab5': 830.61, 'A5': 880.00, 'Bb5': 932.33, 'B5': 987.77,
  'C6': 1046.50, 'D6': 1174.66, 'E6': 1318.51, 'F6': 1396.91, 'G6': 1567.98,
  'REST': 0
};

export interface NoteEvent {
  note: string;
  duration: number; // in beats
  bass?: string; // gentle accompaniment note
}

export interface CarolTrack {
  id: string;
  title: string;
  bpm: number;
  melody: NoteEvent[];
}

export const CAROL_TRACKS: CarolTrack[] = [
  {
    id: 'silent-night',
    title: 'Silent Night (Gentle Music Box)',
    bpm: 72,
    melody: [
      { note: 'G4', duration: 1.5, bass: 'C3' },
      { note: 'A4', duration: 0.5 },
      { note: 'G4', duration: 1.0, bass: 'E3' },
      { note: 'E4', duration: 3.0, bass: 'C3' },

      { note: 'G4', duration: 1.5, bass: 'C3' },
      { note: 'A4', duration: 0.5 },
      { note: 'G4', duration: 1.0, bass: 'E3' },
      { note: 'E4', duration: 3.0, bass: 'C3' },

      { note: 'D5', duration: 2.0, bass: 'G3' },
      { note: 'D5', duration: 1.0 },
      { note: 'B4', duration: 3.0, bass: 'G3' },

      { note: 'C5', duration: 2.0, bass: 'C3' },
      { note: 'C5', duration: 1.0 },
      { note: 'G4', duration: 3.0, bass: 'C3' },

      { note: 'A4', duration: 2.0, bass: 'F3' },
      { note: 'A4', duration: 1.0 },
      { note: 'C5', duration: 1.5, bass: 'F3' },
      { note: 'B4', duration: 0.5 },
      { note: 'A4', duration: 1.0 },
      { note: 'G4', duration: 1.5, bass: 'C3' },
      { note: 'A4', duration: 0.5 },
      { note: 'G4', duration: 1.0 },
      { note: 'E4', duration: 3.0, bass: 'C3' },

      { note: 'A4', duration: 2.0, bass: 'F3' },
      { note: 'A4', duration: 1.0 },
      { note: 'C5', duration: 1.5, bass: 'F3' },
      { note: 'B4', duration: 0.5 },
      { note: 'A4', duration: 1.0 },
      { note: 'G4', duration: 1.5, bass: 'C3' },
      { note: 'A4', duration: 0.5 },
      { note: 'G4', duration: 1.0 },
      { note: 'E4', duration: 3.0, bass: 'C3' },

      { note: 'D5', duration: 2.0, bass: 'G3' },
      { note: 'D5', duration: 1.0 },
      { note: 'F5', duration: 1.5, bass: 'G3' },
      { note: 'D5', duration: 0.5 },
      { note: 'B4', duration: 1.0 },
      { note: 'C5', duration: 3.0, bass: 'C3' },
      { note: 'E5', duration: 3.0, bass: 'G3' },

      { note: 'C5', duration: 1.5, bass: 'C3' },
      { note: 'G4', duration: 0.5 },
      { note: 'E4', duration: 1.0 },
      { note: 'G4', duration: 1.5, bass: 'G3' },
      { note: 'F4', duration: 0.5 },
      { note: 'D4', duration: 1.0 },
      { note: 'C4', duration: 3.0, bass: 'C3' }
    ]
  },
  {
    id: 'we-wish-you',
    title: 'We Wish You a Merry Christmas',
    bpm: 110,
    melody: [
      { note: 'D4', duration: 1.0, bass: 'G3' },
      { note: 'G4', duration: 1.0, bass: 'G3' },
      { note: 'G4', duration: 0.5 },
      { note: 'A4', duration: 0.5 },
      { note: 'G4', duration: 0.5 },
      { note: 'F#4', duration: 0.5 },
      { note: 'E4', duration: 1.0, bass: 'C3' },
      { note: 'E4', duration: 1.0 },
      { note: 'E4', duration: 1.0 },

      { note: 'A4', duration: 1.0, bass: 'A3' },
      { note: 'A4', duration: 0.5 },
      { note: 'B4', duration: 0.5 },
      { note: 'A4', duration: 0.5 },
      { note: 'G4', duration: 0.5 },
      { note: 'F#4', duration: 1.0, bass: 'D3' },
      { note: 'D4', duration: 1.0 },
      { note: 'D4', duration: 1.0 },

      { note: 'B4', duration: 1.0, bass: 'B3' },
      { note: 'B4', duration: 0.5 },
      { note: 'C5', duration: 0.5 },
      { note: 'B4', duration: 0.5 },
      { note: 'A4', duration: 0.5 },
      { note: 'G4', duration: 1.0, bass: 'E3' },
      { note: 'E4', duration: 1.0 },
      { note: 'D4', duration: 0.5, bass: 'D3' },
      { note: 'D4', duration: 0.5 },

      { note: 'E4', duration: 1.0, bass: 'C3' },
      { note: 'A4', duration: 1.0, bass: 'D3' },
      { note: 'F#4', duration: 1.0 },
      { note: 'G4', duration: 2.0, bass: 'G3' }
    ]
  },
  {
    id: 'jingle-bells',
    title: 'Jingle Bells (Soft Music Box)',
    bpm: 120,
    melody: [
      { note: 'E4', duration: 1.0, bass: 'C3' },
      { note: 'E4', duration: 1.0 },
      { note: 'E4', duration: 2.0, bass: 'C3' },

      { note: 'E4', duration: 1.0, bass: 'C3' },
      { note: 'E4', duration: 1.0 },
      { note: 'E4', duration: 2.0, bass: 'C3' },

      { note: 'E4', duration: 1.0, bass: 'C3' },
      { note: 'G4', duration: 1.0 },
      { note: 'C4', duration: 1.5, bass: 'C3' },
      { note: 'D4', duration: 0.5 },
      { note: 'E4', duration: 4.0, bass: 'C3' },

      { note: 'F4', duration: 1.0, bass: 'F3' },
      { note: 'F4', duration: 1.0 },
      { note: 'F4', duration: 1.5, bass: 'F3' },
      { note: 'F4', duration: 0.5 },
      { note: 'F4', duration: 1.0, bass: 'F3' },
      { note: 'E4', duration: 1.0 },
      { note: 'E4', duration: 1.0, bass: 'C3' },
      { note: 'E4', duration: 0.5 },
      { note: 'E4', duration: 0.5 },

      { note: 'E4', duration: 1.0, bass: 'G3' },
      { note: 'D4', duration: 1.0 },
      { note: 'D4', duration: 1.0, bass: 'G3' },
      { note: 'E4', duration: 1.0 },
      { note: 'D4', duration: 2.0, bass: 'G3' },
      { note: 'G4', duration: 2.0 }
    ]
  }
];

class XmasMusicEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private currentTrackIdx = 0;
  private currentNoteIdx = 0;
  private timeoutId: any = null;
  private volume = 0.18; // Moderate, gentle, mild ambient volume
  private masterGain: GainNode | null = null;
  private listeners: ((state: { isPlaying: boolean; track: CarolTrack; volume: number }) => void)[] = [];

  constructor() {
    // Lazy AudioContext initialization on first user interaction
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a soft, bell-like music box chime note
  private playMusicBoxNote(freq: number, durationSec: number, velocity: number = 0.5, timeOffset: number = 0) {
    if (!this.ctx || !this.masterGain || freq <= 0) return;

    const startTime = this.ctx.currentTime + timeOffset;

    // Primary bell tine (Sine)
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, startTime);

    // Warm second harmonic
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, startTime);

    // Sparkle harmonic chime
    const osc3 = this.ctx.createOscillator();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(freq * 3.01, startTime);

    // Individual note gain with gentle chime bell envelope
    const noteGain = this.ctx.createGain();
    noteGain.gain.setValueAtTime(0.0001, startTime);
    noteGain.gain.linearRampToValueAtTime(velocity * 0.22, startTime + 0.012);
    // Exponential decay typical of musical clock/tine
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + Math.max(0.6, durationSec * 1.5));

    // Connect oscillators
    osc1.connect(noteGain);
    
    // Softer gains for harmonics
    const gain2 = this.ctx.createGain();
    gain2.gain.setValueAtTime(0.2, startTime);
    osc2.connect(gain2);
    gain2.connect(noteGain);

    const gain3 = this.ctx.createGain();
    gain3.gain.setValueAtTime(0.12, startTime);
    osc3.connect(gain3);
    gain3.connect(noteGain);

    noteGain.connect(this.masterGain);

    // Start and stop
    const stopTime = startTime + Math.max(0.7, durationSec * 1.6);
    osc1.start(startTime);
    osc2.start(startTime);
    osc3.start(startTime);

    osc1.stop(stopTime);
    osc2.stop(stopTime);
    osc3.stop(stopTime);
  }

  // Single festive ornament bell chime for user interaction (clicking dropping balls)
  public playOrnamentChime(freqMultiplier: number = 1.0) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const baseFreq = 880 * freqMultiplier; // A5 range
    this.playMusicBoxNote(baseFreq, 1.2, 0.45);
    this.playMusicBoxNote(baseFreq * 1.25, 1.0, 0.35, 0.05); // Major 3rd
    this.playMusicBoxNote(baseFreq * 1.5, 1.4, 0.4, 0.1);  // 5th
  }

  private scheduleNextNote() {
    if (!this.isPlaying) return;

    const track = CAROL_TRACKS[this.currentTrackIdx];
    if (this.currentNoteIdx >= track.melody.length) {
      // Loop or go to next track
      this.currentNoteIdx = 0;
      this.currentTrackIdx = (this.currentTrackIdx + 1) % CAROL_TRACKS.length;
      this.notifyListeners();
    }

    const currentTrack = CAROL_TRACKS[this.currentTrackIdx];
    const event = currentTrack.melody[this.currentNoteIdx];
    const beatSec = 60 / currentTrack.bpm;
    const durationSec = event.duration * beatSec;

    // Play melody note
    const freq = NOTE_FREQS[event.note] || 0;
    if (freq > 0) {
      this.playMusicBoxNote(freq, durationSec, 0.55);
    }

    // Play gentle accompaniment bass note if present
    if (event.bass) {
      const bassFreq = NOTE_FREQS[event.bass] || 0;
      if (bassFreq > 0) {
        this.playMusicBoxNote(bassFreq, durationSec * 1.8, 0.28);
      }
    }

    this.currentNoteIdx++;

    // Schedule next beat
    this.timeoutId = setTimeout(() => {
      this.scheduleNextNote();
    }, durationSec * 1000);
  }

  public play(trackIdx?: number) {
    this.initContext();
    if (trackIdx !== undefined && trackIdx >= 0 && trackIdx < CAROL_TRACKS.length) {
      if (this.currentTrackIdx !== trackIdx) {
        this.currentTrackIdx = trackIdx;
        this.currentNoteIdx = 0;
      }
    }

    if (this.isPlaying) return;

    this.isPlaying = true;
    this.notifyListeners();
    this.scheduleNextNote();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.notifyListeners();
  }

  public toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public nextTrack() {
    this.currentTrackIdx = (this.currentTrackIdx + 1) % CAROL_TRACKS.length;
    this.currentNoteIdx = 0;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.notifyListeners();
    if (this.isPlaying) {
      this.scheduleNextNote();
    }
  }

  public prevTrack() {
    this.currentTrackIdx = (this.currentTrackIdx - 1 + CAROL_TRACKS.length) % CAROL_TRACKS.length;
    this.currentNoteIdx = 0;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.notifyListeners();
    if (this.isPlaying) {
      this.scheduleNextNote();
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
    this.notifyListeners();
  }

  public getVolume() {
    return this.volume;
  }

  public getState() {
    return {
      isPlaying: this.isPlaying,
      track: CAROL_TRACKS[this.currentTrackIdx],
      volume: this.volume
    };
  }

  public subscribe(fn: (state: { isPlaying: boolean; track: CarolTrack; volume: number }) => void) {
    this.listeners.push(fn);
    fn(this.getState());
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  public initAutoPlay() {
    if (typeof window === 'undefined') return;

    // 1. Attempt immediate gentle background playback
    try {
      this.setVolume(0.18);
      this.play();
    } catch (e) {
      // Browser autoplay policy might restrict until user gesture
    }

    // 2. Set up gesture-based unlock on first click, scroll, touch, or keypress
    const unlockAndPlay = () => {
      try {
        if (!this.isPlaying) {
          this.setVolume(0.18);
          this.play();
        } else if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
      } catch (e) {
        // Ignore
      }
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener('click', unlockAndPlay);
      window.removeEventListener('touchstart', unlockAndPlay);
      window.removeEventListener('scroll', unlockAndPlay);
      window.removeEventListener('keydown', unlockAndPlay);
      window.removeEventListener('pointerdown', unlockAndPlay);
    };

    window.addEventListener('click', unlockAndPlay, { passive: true, once: true });
    window.addEventListener('touchstart', unlockAndPlay, { passive: true, once: true });
    window.addEventListener('scroll', unlockAndPlay, { passive: true, once: true });
    window.addEventListener('keydown', unlockAndPlay, { passive: true, once: true });
    window.addEventListener('pointerdown', unlockAndPlay, { passive: true, once: true });
  }

  private notifyListeners() {
    const state = this.getState();
    this.listeners.forEach(l => l(state));
  }
}

export const xmasMusic = new XmasMusicEngine();
