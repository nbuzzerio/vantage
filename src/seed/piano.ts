import type { DomainDefinition } from '../models/domain'
import { domainDefinitionSchema } from '../models/schemas'

const pianoDefinitionInput = {
  schemaVersion: 1,
  id: 'piano',
  name: 'Piano',
  description: 'Develop the independent capabilities that make playing piano fluent, expressive, and personally meaningful.',
  northStar: 'Play the music I care about with fluency, understanding, and personal expression.',
  branches: [
    {
      id: 'reading',
      name: 'Reading',
      description: 'Decode notation fluently enough to maintain forward musical motion.',
      subskills: [
        { id: 'note-pattern-recognition', name: 'Note & pattern recognition' },
        { id: 'keyboard-mapping', name: 'Keyboard mapping' },
      ],
      benchmarks: [
        { id: 'recognize-common-intervals', title: 'Recognize common melodic intervals directly rather than calculating every note individually.', subskillId: 'note-pattern-recognition' },
        { id: 'continuous-sight-reading', title: 'Sight-read a short unfamiliar easy passage while maintaining forward motion.' },
      ],
    },
    {
      id: 'rhythm-flow',
      name: 'Rhythm & Flow',
      description: 'Maintain pulse, timing, continuity, and recovery through mistakes.',
      benchmarks: [
        { id: 'steady-pulse', title: 'Keep a steady pulse through a short piece with common note values and rests.' },
        { id: 'recover-without-restarting', title: 'Recover after a mistake without restarting or losing the musical thread.' },
      ],
    },
    {
      id: 'technique-coordination',
      name: 'Technique & Coordination',
      description: 'Develop physical control, fingering, independence, relaxation, scales, arpeggios, and coordination.',
      subskills: [
        { id: 'alignment-relaxation', name: 'Alignment & relaxation' },
        { id: 'finger-coordination', name: 'Finger coordination' },
        { id: 'scales-arpeggios', name: 'Scales & arpeggios' },
      ],
      benchmarks: [
        { id: 'smooth-major-scale', title: 'Play a major scale with correct fingering and smooth crossings.', subskillId: 'scales-arpeggios' },
        { id: 'even-arpeggio', title: 'Play a one-octave arpeggio evenly without unnecessary tension.' },
      ],
    },
    {
      id: 'ear',
      name: 'Ear',
      description: 'Recognize, anticipate, and reproduce musical relationships by sound.',
      subskills: [
        { id: 'aural-recognition', name: 'Aural recognition' },
        { id: 'audiation', name: 'Audiation' },
      ],
      benchmarks: [
        { id: 'identify-melodic-intervals', title: 'Reliably identify a selected set of melodic intervals.', subskillId: 'aural-recognition' },
        { id: 'reproduce-simple-melody', title: 'Reproduce a short simple melody by ear.' },
      ],
    },
    {
      id: 'theory-harmony',
      name: 'Theory & Harmony',
      description: 'Understand the structures underlying the music being played.',
      subskills: [
        { id: 'keys-scales', name: 'Keys & scales' },
        { id: 'chords-progressions', name: 'Chords & progressions' },
      ],
      benchmarks: [
        { id: 'name-key-chords', title: 'Name the key and primary chords in a straightforward piece.' },
        { id: 'explain-harmonic-movement', title: 'Explain a simple chord progression and hear where it creates and releases tension.', subskillId: 'chords-progressions' },
      ],
    },
    {
      id: 'expression-interpretation',
      name: 'Expression & Interpretation',
      description: 'Use dynamics, articulation, phrasing, voicing, character, and intentional performance decisions.',
      benchmarks: [
        { id: 'shape-musical-phrase', title: 'Shape a short phrase with an intentional dynamic direction and clear articulation.' },
        { id: 'balance-melody-accompaniment', title: 'Keep a melody perceptibly above its accompaniment.' },
      ],
    },
    {
      id: 'repertoire',
      name: 'Repertoire',
      description: 'Learn, retain, polish, and perform complete music.',
      subskills: [
        { id: 'learning-retention', name: 'Learning & retention' },
        { id: 'performance-readiness', name: 'Performance readiness' },
      ],
      benchmarks: [
        { id: 'perform-complete-piece', title: 'Perform a complete, manageable piece with continuity from beginning to end.' },
        { id: 'retain-after-time-away', title: 'Return to a learned piece after time away and restore it efficiently.', subskillId: 'learning-retention' },
      ],
    },
    {
      id: 'creation-musicianship',
      name: 'Creation & Musicianship',
      description: 'Improvise, play by ear, arrange, transpose, compose, and apply musical understanding creatively.',
      subskills: [
        { id: 'improvisation', name: 'Improvisation' },
        { id: 'arranging-transposition', name: 'Arranging & transposition' },
      ],
      benchmarks: [
        { id: 'improvise-over-progression', title: 'Improvise a short coherent phrase over a simple repeating progression.', subskillId: 'improvisation' },
        { id: 'transpose-simple-pattern', title: 'Transpose a simple melody or accompaniment pattern into another familiar key.' },
      ],
    },
  ],
} satisfies DomainDefinition

export const pianoDefinition = domainDefinitionSchema.parse(pianoDefinitionInput)
