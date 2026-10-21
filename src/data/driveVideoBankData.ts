import { MuscleGroup, ExperienceLevel, EquipmentType, Exercise } from '../types';

export interface DriveVideoItem {
  id: string;
  fileName: string;
  name: string;
  gender: 'WOMEN' | 'MEN' | 'UNISEX';
  subfolderCategory: string;
  muscleGroup: MuscleGroup;
  targetMuscles: string;
  equipment: EquipmentType;
  difficulty: ExperienceLevel;
  suggestedSets: string;
  suggestedReps: string;
  suggestedRestSeconds: number;
  instructions: string[];
  keyFormTip: string;
  driveUrl: string;
  embedUrl: string;
  path: string[];
}

export const ORIGINAL_DRIVE_FOLDER_URL = 'https://drive.google.com/drive/folders/1p4v21tTehtDmIDr9Qst8Ib4hIIDw6f6i?usp=drive_link';
export const ORIGINAL_DRIVE_FOLDER_ID = '1p4v21tTehtDmIDr9Qst8Ib4hIIDw6f6i';

export const DEFAULT_DRIVE_VIDEOS: DriveVideoItem[] = [
  {
    "id": "13hAdUsouYAwEs5m_j8qdJWvtbXb0e_m-",
    "fileName": "45 Degree Bycicle Twisting Crunch.mp4",
    "name": "45 Degree Bycicle Twisting Crunch",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for 45 Degree Bycicle Twisting Crunch.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/13hAdUsouYAwEs5m_j8qdJWvtbXb0e_m-/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/13hAdUsouYAwEs5m_j8qdJWvtbXb0e_m-/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "1dOeKqfF2VTTNu2rsqEwhUXw1Sl1_zYgB",
    "fileName": "45 Degree Side Bend.mp4",
    "name": "45 Degree Side Bend",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for 45 Degree Side Bend.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1dOeKqfF2VTTNu2rsqEwhUXw1Sl1_zYgB/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1dOeKqfF2VTTNu2rsqEwhUXw1Sl1_zYgB/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "1-QwoeJVI-Ljda3f3O6s_r_qOF9NSUWiB",
    "fileName": "Air Twisting Crunch.mp4",
    "name": "Air Twisting Crunch",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Air Twisting Crunch.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1-QwoeJVI-Ljda3f3O6s_r_qOF9NSUWiB/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1-QwoeJVI-Ljda3f3O6s_r_qOF9NSUWiB/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "1j9KCM8McEzgNwsxK1bERP0oNOHzfbsZa",
    "fileName": "Band Decline Sit-ups.mp4",
    "name": "Band Decline Sit-ups",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "HOME_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Decline Sit-ups.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1j9KCM8McEzgNwsxK1bERP0oNOHzfbsZa/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1j9KCM8McEzgNwsxK1bERP0oNOHzfbsZa/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "1oclb8VwCwGt6VmD3b-O6YNRFgmn-UcRE",
    "fileName": "Band Side Bend.mp4",
    "name": "Band Side Bend",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Side Bend.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1oclb8VwCwGt6VmD3b-O6YNRFgmn-UcRE/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1oclb8VwCwGt6VmD3b-O6YNRFgmn-UcRE/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "1MSc6kNMR-WTvBiFU5qSSY7rmQWxdCo7T",
    "fileName": "Band Standing Crunch.mp4",
    "name": "Band Standing Crunch",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Standing Crunch.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1MSc6kNMR-WTvBiFU5qSSY7rmQWxdCo7T/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1MSc6kNMR-WTvBiFU5qSSY7rmQWxdCo7T/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "1VVX8yzJtQHkW9XHoOznoTmfuRCcDcPRF",
    "fileName": "Band Standing Lift.mp4",
    "name": "Band Standing Lift",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Standing Lift.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1VVX8yzJtQHkW9XHoOznoTmfuRCcDcPRF/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1VVX8yzJtQHkW9XHoOznoTmfuRCcDcPRF/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "1NdBrnIkuvLkunQBDWpeysUzILRju2kPo",
    "fileName": "Band Twist (Up-down).mp4",
    "name": "Band Twist (Up-down)",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Twist (Up-down).",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1NdBrnIkuvLkunQBDWpeysUzILRju2kPo/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1NdBrnIkuvLkunQBDWpeysUzILRju2kPo/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "1aMPoIX6aB85tZCTXzMbrtv2gTPV3beDa",
    "fileName": "Band Twist.mp4",
    "name": "Band Twist",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Twist.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1aMPoIX6aB85tZCTXzMbrtv2gTPV3beDa/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1aMPoIX6aB85tZCTXzMbrtv2gTPV3beDa/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "1viDjlcIqLbYJHXvpfT6dvcaFSLrqQu99",
    "fileName": "Bench Leg Raise.mp4",
    "name": "Bench Leg Raise",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Bench Leg Raise.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1viDjlcIqLbYJHXvpfT6dvcaFSLrqQu99/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1viDjlcIqLbYJHXvpfT6dvcaFSLrqQu99/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "1SM8KyAgmHsZFd4XRK--tVmh7k8ouFnOg",
    "fileName": "Bent Knee Lying Twist.mp4",
    "name": "Bent Knee Lying Twist",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Bent Knee Lying Twist.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1SM8KyAgmHsZFd4XRK--tVmh7k8ouFnOg/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1SM8KyAgmHsZFd4XRK--tVmh7k8ouFnOg/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "1JJTJVhQusV7avjDypjT2dfHIpbeVB2BB",
    "fileName": "Cable Kneeling Crunch.mp4",
    "name": "Cable Kneeling Crunch",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Kneeling Crunch.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1JJTJVhQusV7avjDypjT2dfHIpbeVB2BB/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1JJTJVhQusV7avjDypjT2dfHIpbeVB2BB/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "1G9pONoiedp74gQTAhP9kNj8kbwVUw5NR",
    "fileName": "Cable Standing Crunch.mp4",
    "name": "Cable Standing Crunch",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Standing Crunch.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1G9pONoiedp74gQTAhP9kNj8kbwVUw5NR/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1G9pONoiedp74gQTAhP9kNj8kbwVUw5NR/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "1XQ2dfRVAMzT48f16yORgoO6cGa5hc8sz",
    "fileName": "Cable Standing Lift.mp4",
    "name": "Cable Standing Lift",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Standing Lift.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1XQ2dfRVAMzT48f16yORgoO6cGa5hc8sz/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1XQ2dfRVAMzT48f16yORgoO6cGa5hc8sz/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "10smy1_3Y2OEYmzqbNHTCTKn1hTSU2jQa",
    "fileName": "Cable Twist (up-down).mp4",
    "name": "Cable Twist (up-down)",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Twist (up-down).",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/10smy1_3Y2OEYmzqbNHTCTKn1hTSU2jQa/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/10smy1_3Y2OEYmzqbNHTCTKn1hTSU2jQa/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "1GD8F7_D53J3CSJnZN7Gt4QuIk5fwaYEd",
    "fileName": "Crunch (on bench).mp4",
    "name": "Crunch (on bench)",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Crunch (on bench).",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1GD8F7_D53J3CSJnZN7Gt4QuIk5fwaYEd/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1GD8F7_D53J3CSJnZN7Gt4QuIk5fwaYEd/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "1tDDNxoXL6SXhe3RK9Yyp_SF2e5uADTNz",
    "fileName": "Dumbbell Side Bend.mp4",
    "name": "Dumbbell Side Bend",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Side Bend.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1tDDNxoXL6SXhe3RK9Yyp_SF2e5uADTNz/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1tDDNxoXL6SXhe3RK9Yyp_SF2e5uADTNz/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "1zN1RvhkprGZFEx4D8xU0co1ujGIqvvxZ",
    "fileName": "Hanging Leg Hip Raise.mp4",
    "name": "Hanging Leg Hip Raise",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Hanging Leg Hip Raise.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1zN1RvhkprGZFEx4D8xU0co1ujGIqvvxZ/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1zN1RvhkprGZFEx4D8xU0co1ujGIqvvxZ/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "1Sq6LObjsyWbxBQwFdX8I_3o8mNpld4o0",
    "fileName": "Hanging Straight Leg Hip Raise.mp4",
    "name": "Hanging Straight Leg Hip Raise",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Hanging Straight Leg Hip Raise.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1Sq6LObjsyWbxBQwFdX8I_3o8mNpld4o0/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Sq6LObjsyWbxBQwFdX8I_3o8mNpld4o0/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "1cOevx2AyL-6s0I_GEqObNp5J-v_DPvp-",
    "fileName": "Hanging Straight Leg Raise.mp4",
    "name": "Hanging Straight Leg Raise",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Hanging Straight Leg Raise.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1cOevx2AyL-6s0I_GEqObNp5J-v_DPvp-/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1cOevx2AyL-6s0I_GEqObNp5J-v_DPvp-/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "1C7gPUEHWU7B5cw7iZnZsG5TbGgu63NNz",
    "fileName": "Incline Leg Hip Raise.mp4",
    "name": "Incline Leg Hip Raise",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Incline Leg Hip Raise.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1C7gPUEHWU7B5cw7iZnZsG5TbGgu63NNz/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1C7gPUEHWU7B5cw7iZnZsG5TbGgu63NNz/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "1hWoW8H-z94reuNc2vgpN7RkrzFQVbcxN",
    "fileName": "Landmine 180.mp4",
    "name": "Landmine 180",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Landmine 180.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1hWoW8H-z94reuNc2vgpN7RkrzFQVbcxN/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1hWoW8H-z94reuNc2vgpN7RkrzFQVbcxN/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "11Bfd4skgLzM6MlaMaMyXahoaTlqr6uRq",
    "fileName": "Lever Seated Crunch.mp4",
    "name": "Lever Seated Crunch",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Seated Crunch.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/11Bfd4skgLzM6MlaMaMyXahoaTlqr6uRq/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/11Bfd4skgLzM6MlaMaMyXahoaTlqr6uRq/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "116VXZmJ7SUAjzTzg8ZiNmncYmZ6gjaus",
    "fileName": "Lever Seated Leg Raise Crunch.mp4",
    "name": "Lever Seated Leg Raise Crunch",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Seated Leg Raise Crunch.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/116VXZmJ7SUAjzTzg8ZiNmncYmZ6gjaus/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/116VXZmJ7SUAjzTzg8ZiNmncYmZ6gjaus/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "1NZvGsSAuUu6Bo52q-AQBYn3mgnuaNMbl",
    "fileName": "Lying Floor Leg Raise.mp4",
    "name": "Lying Floor Leg Raise",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lying Floor Leg Raise.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1NZvGsSAuUu6Bo52q-AQBYn3mgnuaNMbl/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1NZvGsSAuUu6Bo52q-AQBYn3mgnuaNMbl/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "1qfYr9Kvfpm9J2HNBsLnXHpwfEW6NZKvf",
    "fileName": "Lying Straight Leg Raise.mp4",
    "name": "Lying Straight Leg Raise",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lying Straight Leg Raise.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1qfYr9Kvfpm9J2HNBsLnXHpwfEW6NZKvf/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1qfYr9Kvfpm9J2HNBsLnXHpwfEW6NZKvf/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "1ZVm6CTCVyHyZwb2n2g-VEApjTd4T2JoO",
    "fileName": "Otis-ups.mp4",
    "name": "Otis-ups",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Otis-ups.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1ZVm6CTCVyHyZwb2n2g-VEApjTd4T2JoO/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1ZVm6CTCVyHyZwb2n2g-VEApjTd4T2JoO/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "1gYPJO2SnVRgdvF4cBfVQDJa5EbIP7HHK",
    "fileName": "Side Bridge - Side Plank.mp4",
    "name": "Side Bridge - Side Plank",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Side Bridge - Side Plank.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1gYPJO2SnVRgdvF4cBfVQDJa5EbIP7HHK/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1gYPJO2SnVRgdvF4cBfVQDJa5EbIP7HHK/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "1woL0J6FLKpXLKeF1kyEYrgieicXG2Rx5",
    "fileName": "Sit-up On Exercise Ball.mp4",
    "name": "Sit-up On Exercise Ball",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Sit-up On Exercise Ball.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1woL0J6FLKpXLKeF1kyEYrgieicXG2Rx5/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1woL0J6FLKpXLKeF1kyEYrgieicXG2Rx5/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "146qz9iFbA7aTwuZ3u22TRJQyHTL5v5gy",
    "fileName": "Sit-ups.mp4",
    "name": "Sit-ups",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Sit-ups.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/146qz9iFbA7aTwuZ3u22TRJQyHTL5v5gy/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/146qz9iFbA7aTwuZ3u22TRJQyHTL5v5gy/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "12Z1JXep66bOn9VeFSeatjMoxp6tUmM9C",
    "fileName": "Spell Caster.mp4",
    "name": "Spell Caster",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Spell Caster.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/12Z1JXep66bOn9VeFSeatjMoxp6tUmM9C/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/12Z1JXep66bOn9VeFSeatjMoxp6tUmM9C/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "1rPVoJFs1z5o0ncytfL41d0B-9VWwLyUS",
    "fileName": "Stretching - Chin-to-chest Stretch.mp4",
    "name": "Stretching - Chin-to-chest Stretch",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Chin-to-chest Stretch.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1rPVoJFs1z5o0ncytfL41d0B-9VWwLyUS/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1rPVoJFs1z5o0ncytfL41d0B-9VWwLyUS/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "12MbG6avOGBhUsMpgA3PkH2kUZy3miBhC",
    "fileName": "Stretching - Iron Cross Stretch.mp4",
    "name": "Stretching - Iron Cross Stretch",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Iron Cross Stretch.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/12MbG6avOGBhUsMpgA3PkH2kUZy3miBhC/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/12MbG6avOGBhUsMpgA3PkH2kUZy3miBhC/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "1ygBAE1h3kxCOd36s86k1hgkWPGHzln79",
    "fileName": "Stretching - Seated Twist (straight arm).mp4",
    "name": "Stretching - Seated Twist (straight arm)",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Seated Twist (straight arm).",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1ygBAE1h3kxCOd36s86k1hgkWPGHzln79/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1ygBAE1h3kxCOd36s86k1hgkWPGHzln79/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "15VwgCzi_jvwiX2cDqkdj5-blLcVNt3iN",
    "fileName": "Stretching - Spinal Stretch On Exercise Ball.mp4",
    "name": "Stretching - Spinal Stretch On Exercise Ball",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Spinal Stretch On Exercise Ball.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/15VwgCzi_jvwiX2cDqkdj5-blLcVNt3iN/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/15VwgCzi_jvwiX2cDqkdj5-blLcVNt3iN/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "1X4RD6ZyVWq4Q5s9TAMRqSpWR3dcBE1th",
    "fileName": "Stretching - Standing Side Bend (bent arm).mp4",
    "name": "Stretching - Standing Side Bend (bent arm)",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Standing Side Bend (bent arm).",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1X4RD6ZyVWq4Q5s9TAMRqSpWR3dcBE1th/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1X4RD6ZyVWq4Q5s9TAMRqSpWR3dcBE1th/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "13SI4n708Xni1nIqhoNJoaiT-6VmpSx-u",
    "fileName": "Twisting Crunch.mp4",
    "name": "Twisting Crunch",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Twisting Crunch.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/13SI4n708Xni1nIqhoNJoaiT-6VmpSx-u/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/13SI4n708Xni1nIqhoNJoaiT-6VmpSx-u/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "1rlaEj1jfqTmNSJS5zk7d19LKimoDp3Ez",
    "fileName": "V-up.mp4",
    "name": "V-up",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for V-up.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1rlaEj1jfqTmNSJS5zk7d19LKimoDp3Ez/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1rlaEj1jfqTmNSJS5zk7d19LKimoDp3Ez/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "1u0BAVYo7XmnfLJLNu87hjzrLdi_HDAr9",
    "fileName": "Vertical Leg Raise (on parallel bars).mp4",
    "name": "Vertical Leg Raise (on parallel bars)",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Vertical Leg Raise (on parallel bars).",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1u0BAVYo7XmnfLJLNu87hjzrLdi_HDAr9/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1u0BAVYo7XmnfLJLNu87hjzrLdi_HDAr9/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "1dob1ZMkO8Psc5SkFfZHBKHhBlCMW5UUf",
    "fileName": "Weighted Leg Extension Crunch.mp4",
    "name": "Weighted Leg Extension Crunch",
    "gender": "WOMEN",
    "subfolderCategory": "Abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Weighted Leg Extension Crunch.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1dob1ZMkO8Psc5SkFfZHBKHhBlCMW5UUf/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1dob1ZMkO8Psc5SkFfZHBKHhBlCMW5UUf/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Abs"
    ]
  },
  {
    "id": "1KxOEpTGhfyEAcpW2NR-5UfaqijO8htaO",
    "fileName": "45 Degree Hyperextension.mp4",
    "name": "45 Degree Hyperextension",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for 45 Degree Hyperextension.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1KxOEpTGhfyEAcpW2NR-5UfaqijO8htaO/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1KxOEpTGhfyEAcpW2NR-5UfaqijO8htaO/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "10Yj2g9PMs5x_mbsEN0H1vpDyeVh89LfL",
    "fileName": "Band Assisted Pull-up.mp4",
    "name": "Band Assisted Pull-up",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Assisted Pull-up.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/10Yj2g9PMs5x_mbsEN0H1vpDyeVh89LfL/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/10Yj2g9PMs5x_mbsEN0H1vpDyeVh89LfL/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "16TYkfp4mOBXoYlLdB0XK3fTLnxTpR9He",
    "fileName": "Band Bent-over Row.mp4",
    "name": "Band Bent-over Row",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Bent-over Row.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/16TYkfp4mOBXoYlLdB0XK3fTLnxTpR9He/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/16TYkfp4mOBXoYlLdB0XK3fTLnxTpR9He/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1CDgM9AP_d-gXJeR0Jp0EsjDBn5oqWP8m",
    "fileName": "Band Kneeling One Arm Pulldown.mp4",
    "name": "Band Kneeling One Arm Pulldown",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Kneeling One Arm Pulldown.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1CDgM9AP_d-gXJeR0Jp0EsjDBn5oqWP8m/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1CDgM9AP_d-gXJeR0Jp0EsjDBn5oqWP8m/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "18RtoF0XKNg6hCE17zz744U3o5QadmWXj",
    "fileName": "Band One Arm Twisting Seated Row.mp4",
    "name": "Band One Arm Twisting Seated Row",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band One Arm Twisting Seated Row.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/18RtoF0XKNg6hCE17zz744U3o5QadmWXj/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/18RtoF0XKNg6hCE17zz744U3o5QadmWXj/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1dWCKtXyAbcH5bUN1jKyfF1Sf__HKZ38K",
    "fileName": "Band One Leg Kickback Bent Position.mp4",
    "name": "Band One Leg Kickback Bent Position",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band One Leg Kickback Bent Position.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1dWCKtXyAbcH5bUN1jKyfF1Sf__HKZ38K/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1dWCKtXyAbcH5bUN1jKyfF1Sf__HKZ38K/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1Aj7tSeM95alHV3KD_05V2U3iN6Buj_sy",
    "fileName": "Band Pull Through.mp4",
    "name": "Band Pull Through",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Pull Through.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1Aj7tSeM95alHV3KD_05V2U3iN6Buj_sy/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Aj7tSeM95alHV3KD_05V2U3iN6Buj_sy/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1jeYXmLS2WYN4uK5iN5En2jHGtWhzRj44",
    "fileName": "Band Seated Row.mp4",
    "name": "Band Seated Row",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Seated Row.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1jeYXmLS2WYN4uK5iN5En2jHGtWhzRj44/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1jeYXmLS2WYN4uK5iN5En2jHGtWhzRj44/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1prvG3tcEWOKNduqhSKov1GxZmtQKxL7l",
    "fileName": "Band Straight Back Seated Row.mp4",
    "name": "Band Straight Back Seated Row",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Straight Back Seated Row.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1prvG3tcEWOKNduqhSKov1GxZmtQKxL7l/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1prvG3tcEWOKNduqhSKov1GxZmtQKxL7l/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1jplkEQavY6MSPBWgsF2WeLcbwxh7zcXJ",
    "fileName": "Barbell Bent-over Row Overgrip.mp4",
    "name": "Barbell Bent-over Row Overgrip",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Bent-over Row Overgrip.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1jplkEQavY6MSPBWgsF2WeLcbwxh7zcXJ/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1jplkEQavY6MSPBWgsF2WeLcbwxh7zcXJ/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1OQc57rh7o5BOetSw0MzdvyUFVDWqLJWx",
    "fileName": "Barbell Straight Leg Deadlift.mp4",
    "name": "Barbell Straight Leg Deadlift",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Straight Leg Deadlift.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1OQc57rh7o5BOetSw0MzdvyUFVDWqLJWx/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1OQc57rh7o5BOetSw0MzdvyUFVDWqLJWx/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1YHiTKlelEwpxypHsYMtj19Pmgj_5MRwk",
    "fileName": "Barbell Underhand Bent-over Row.mp4",
    "name": "Barbell Underhand Bent-over Row",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Underhand Bent-over Row.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1YHiTKlelEwpxypHsYMtj19Pmgj_5MRwk/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1YHiTKlelEwpxypHsYMtj19Pmgj_5MRwk/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1GF_pbwvcnhc4hs7ZIuz8Zri0m4FX4kno",
    "fileName": "Bench Pull-ups.mp4",
    "name": "Bench Pull-ups",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Bench Pull-ups.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1GF_pbwvcnhc4hs7ZIuz8Zri0m4FX4kno/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1GF_pbwvcnhc4hs7ZIuz8Zri0m4FX4kno/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1M1jAfjLa3b-Wzp8cQORKbwfVpQZOsmwC",
    "fileName": "Cable Bar Lateral Pulldown (reverse-grip).mp4",
    "name": "Cable Bar Lateral Pulldown (reverse-grip)",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Bar Lateral Pulldown (reverse-grip).",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1M1jAfjLa3b-Wzp8cQORKbwfVpQZOsmwC/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1M1jAfjLa3b-Wzp8cQORKbwfVpQZOsmwC/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1g_LAGjPfLxQ33RHxXT9CFJ2q2YLG3ndj",
    "fileName": "Cable Bar Lateral Pulldown (wide shoulder grip).mp4",
    "name": "Cable Bar Lateral Pulldown (wide shoulder grip)",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Bar Lateral Pulldown (wide shoulder grip).",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1g_LAGjPfLxQ33RHxXT9CFJ2q2YLG3ndj/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1g_LAGjPfLxQ33RHxXT9CFJ2q2YLG3ndj/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1QZevnzWbDtz4XEy2fiP74GGKOt4jFQ8S",
    "fileName": "Cable Close Grip Front Lat Pulldown.mp4",
    "name": "Cable Close Grip Front Lat Pulldown",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Close Grip Front Lat Pulldown.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1QZevnzWbDtz4XEy2fiP74GGKOt4jFQ8S/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1QZevnzWbDtz4XEy2fiP74GGKOt4jFQ8S/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1D5Z4AaVR3bbWK5b6EGXKiD51evAKKg0A",
    "fileName": "Cable One Arm Lateral Pulldown.mp4",
    "name": "Cable One Arm Lateral Pulldown",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable One Arm Lateral Pulldown.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1D5Z4AaVR3bbWK5b6EGXKiD51evAKKg0A/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1D5Z4AaVR3bbWK5b6EGXKiD51evAKKg0A/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1zGZm-ZSOiQDl66BeO4-iId-HkWaBoCZx",
    "fileName": "Cable One Arm Twisting Seated Row.mp4",
    "name": "Cable One Arm Twisting Seated Row",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable One Arm Twisting Seated Row.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1zGZm-ZSOiQDl66BeO4-iId-HkWaBoCZx/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1zGZm-ZSOiQDl66BeO4-iId-HkWaBoCZx/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "14Vu-I8MpxvQzuDyIiBVCGUGXSBAihZXm",
    "fileName": "Cable Pulldown.mp4",
    "name": "Cable Pulldown",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Pulldown.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/14Vu-I8MpxvQzuDyIiBVCGUGXSBAihZXm/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/14Vu-I8MpxvQzuDyIiBVCGUGXSBAihZXm/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1iPL-myue4I9Sv0BYaJHVBRsncWlJ4BRJ",
    "fileName": "Cable Seated High Row (V-bar).mp4",
    "name": "Cable Seated High Row (V-bar)",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Seated High Row (V-bar).",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1iPL-myue4I9Sv0BYaJHVBRsncWlJ4BRJ/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1iPL-myue4I9Sv0BYaJHVBRsncWlJ4BRJ/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1ti2Y25mERF4-DH_P5ZkZ7s-s6GML7qJe",
    "fileName": "Cable Seated Row (normal grip).mp4",
    "name": "Cable Seated Row (normal grip)",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Seated Row (normal grip).",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1ti2Y25mERF4-DH_P5ZkZ7s-s6GML7qJe/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1ti2Y25mERF4-DH_P5ZkZ7s-s6GML7qJe/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1TPy9Rmfeqq072DqdEVmW_BOBPpGFBEMt",
    "fileName": "Cable Seated Row (parallel grip).mp4",
    "name": "Cable Seated Row (parallel grip)",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Seated Row (parallel grip).",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1TPy9Rmfeqq072DqdEVmW_BOBPpGFBEMt/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1TPy9Rmfeqq072DqdEVmW_BOBPpGFBEMt/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1gILcCKE3QSSe0KDoEnu0oVb0L2lms7Z4",
    "fileName": "Cable Seated Row (wide-grip).mp4",
    "name": "Cable Seated Row (wide-grip)",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Seated Row (wide-grip).",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1gILcCKE3QSSe0KDoEnu0oVb0L2lms7Z4/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1gILcCKE3QSSe0KDoEnu0oVb0L2lms7Z4/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1CcYhX_321HwefTQE2YEIk_0nLJxfpMPg",
    "fileName": "Cable Straight Arm Pulldown.mp4",
    "name": "Cable Straight Arm Pulldown",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Straight Arm Pulldown.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1CcYhX_321HwefTQE2YEIk_0nLJxfpMPg/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1CcYhX_321HwefTQE2YEIk_0nLJxfpMPg/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "19czfF6Vs51hGoH9fuKRR_P_6YKgZriYk",
    "fileName": "Cable Straight Back Seated High Row (reverse-grip).mp4",
    "name": "Cable Straight Back Seated High Row (reverse-grip)",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Straight Back Seated High Row (reverse-grip).",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/19czfF6Vs51hGoH9fuKRR_P_6YKgZriYk/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/19czfF6Vs51hGoH9fuKRR_P_6YKgZriYk/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1wY1drDbYWkMVx0Goc8P_vuiJwGnTmqqr",
    "fileName": "Cable Straight Back Seated Row (V-grip).mp4",
    "name": "Cable Straight Back Seated Row (V-grip)",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Straight Back Seated Row (V-grip).",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1wY1drDbYWkMVx0Goc8P_vuiJwGnTmqqr/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1wY1drDbYWkMVx0Goc8P_vuiJwGnTmqqr/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1PmLv7KpdEQVzkNJs_Nm2pPM8uJvEcC2S",
    "fileName": "Cambered Bar Lying Row.mp4",
    "name": "Cambered Bar Lying Row",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cambered Bar Lying Row.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1PmLv7KpdEQVzkNJs_Nm2pPM8uJvEcC2S/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1PmLv7KpdEQVzkNJs_Nm2pPM8uJvEcC2S/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1nf3nVMf8S8Bn4_RsipR4Uk_ANp-HCh6W",
    "fileName": "Chin-ups  Pull-Ups.mp4",
    "name": "Chin-ups  Pull-Ups",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Chin-ups  Pull-Ups.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1nf3nVMf8S8Bn4_RsipR4Uk_ANp-HCh6W/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1nf3nVMf8S8Bn4_RsipR4Uk_ANp-HCh6W/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1g4Ak5pqLCVg2aHvjZfjMxnLYDz_jc0GU",
    "fileName": "Chin-ups (narrow parallel grip).mp4",
    "name": "Chin-ups (narrow parallel grip)",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Chin-ups (narrow parallel grip).",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1g4Ak5pqLCVg2aHvjZfjMxnLYDz_jc0GU/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1g4Ak5pqLCVg2aHvjZfjMxnLYDz_jc0GU/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1xnDI_FEGcfcI3Wid4dFDfwVZUNBW0ClG",
    "fileName": "Close Grip Chin-up.mp4",
    "name": "Close Grip Chin-up",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Close Grip Chin-up.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1xnDI_FEGcfcI3Wid4dFDfwVZUNBW0ClG/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1xnDI_FEGcfcI3Wid4dFDfwVZUNBW0ClG/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1EDbtXOEczxdEPMSo6LNBNxOL5CvsgX1k",
    "fileName": "Commando Pull-up.mp4",
    "name": "Commando Pull-up",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Commando Pull-up.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1EDbtXOEczxdEPMSo6LNBNxOL5CvsgX1k/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1EDbtXOEczxdEPMSo6LNBNxOL5CvsgX1k/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1Z-uVbUj0zHjWLMtg5zFf1Z0JkwX14Osw",
    "fileName": "Dumbbell Bent-over Row.mp4",
    "name": "Dumbbell Bent-over Row",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Bent-over Row.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1Z-uVbUj0zHjWLMtg5zFf1Z0JkwX14Osw/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Z-uVbUj0zHjWLMtg5zFf1Z0JkwX14Osw/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1ipwUNgiC4NgJnzrzkzcv6u_KVQ7miW0O",
    "fileName": "Dumbbell Deadlift.mp4",
    "name": "Dumbbell Deadlift",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Deadlift.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1ipwUNgiC4NgJnzrzkzcv6u_KVQ7miW0O/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1ipwUNgiC4NgJnzrzkzcv6u_KVQ7miW0O/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1z7-jdTcB1jRHEAsf-fIoYE-zJ6L1TX2d",
    "fileName": "Dumbbell Hammer Grip Incline Bench Row.mp4",
    "name": "Dumbbell Hammer Grip Incline Bench Row",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Hammer Grip Incline Bench Row.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1z7-jdTcB1jRHEAsf-fIoYE-zJ6L1TX2d/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1z7-jdTcB1jRHEAsf-fIoYE-zJ6L1TX2d/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1y_k2nIpRL2jvctqW8zkJYAgKnu5Ecudq",
    "fileName": "Dumbbell Incline Row.mp4",
    "name": "Dumbbell Incline Row",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Incline Row.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1y_k2nIpRL2jvctqW8zkJYAgKnu5Ecudq/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1y_k2nIpRL2jvctqW8zkJYAgKnu5Ecudq/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1PV6Oma_0_mz-7oKXDXQFppv_zdURN0Gn",
    "fileName": "Dumbbell Lying Rear Delt Row.mp4",
    "name": "Dumbbell Lying Rear Delt Row",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Lying Rear Delt Row.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1PV6Oma_0_mz-7oKXDXQFppv_zdURN0Gn/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1PV6Oma_0_mz-7oKXDXQFppv_zdURN0Gn/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1jWg7pukcC7lZHoxFYYdM7Nsu2kqXylCh",
    "fileName": "Dumbbell Palm Rotational Bent Over Row.mp4",
    "name": "Dumbbell Palm Rotational Bent Over Row",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Palm Rotational Bent Over Row.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1jWg7pukcC7lZHoxFYYdM7Nsu2kqXylCh/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1jWg7pukcC7lZHoxFYYdM7Nsu2kqXylCh/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1trbxHEetFUjCGdIx7eOWteWn6oPXbp0W",
    "fileName": "Dumbbell Reverse Grip Row.mp4",
    "name": "Dumbbell Reverse Grip Row",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Reverse Grip Row.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1trbxHEetFUjCGdIx7eOWteWn6oPXbp0W/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1trbxHEetFUjCGdIx7eOWteWn6oPXbp0W/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1i6RDyaKoFD43BzdSp9zMms7J2gayX0m1",
    "fileName": "Dumbbell Stiff Leg Deadlift.mp4",
    "name": "Dumbbell Stiff Leg Deadlift",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Stiff Leg Deadlift.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1i6RDyaKoFD43BzdSp9zMms7J2gayX0m1/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1i6RDyaKoFD43BzdSp9zMms7J2gayX0m1/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1-uegMSk-x6y4fO3AGJab2mO6ILkb6yyS",
    "fileName": "Hammer Grip Pull-up.mp4",
    "name": "Hammer Grip Pull-up",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Hammer Grip Pull-up.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1-uegMSk-x6y4fO3AGJab2mO6ILkb6yyS/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1-uegMSk-x6y4fO3AGJab2mO6ILkb6yyS/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1nufDtWfTsBVUKiUR9lxEUVHOhi79mF6k",
    "fileName": "Inverted Row Between Chairs.mp4",
    "name": "Inverted Row Between Chairs",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Inverted Row Between Chairs.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1nufDtWfTsBVUKiUR9lxEUVHOhi79mF6k/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1nufDtWfTsBVUKiUR9lxEUVHOhi79mF6k/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1aQ1UOeHmEjGYOE3QIJJEQ2f9ZceD6UMp",
    "fileName": "Inverted Row With Straps.mp4",
    "name": "Inverted Row With Straps",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Inverted Row With Straps.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1aQ1UOeHmEjGYOE3QIJJEQ2f9ZceD6UMp/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1aQ1UOeHmEjGYOE3QIJJEQ2f9ZceD6UMp/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1tzR6BCRD07S3i-kM5pH_ES8wgaQc7etR",
    "fileName": "Kettlebell Deadlift.mp4",
    "name": "Kettlebell Deadlift",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Kettlebell Deadlift.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1tzR6BCRD07S3i-kM5pH_ES8wgaQc7etR/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1tzR6BCRD07S3i-kM5pH_ES8wgaQc7etR/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1l7-eGJ1ID0kMA3zXIVmpbw4kAAMJyrnu",
    "fileName": "Lever Back Extension.mp4",
    "name": "Lever Back Extension",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Back Extension.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1l7-eGJ1ID0kMA3zXIVmpbw4kAAMJyrnu/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1l7-eGJ1ID0kMA3zXIVmpbw4kAAMJyrnu/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1ydCorE4Ji9csQUiRqjkg5TwGoKqwAQuf",
    "fileName": "Lever High Row.mp4",
    "name": "Lever High Row",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever High Row.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1ydCorE4Ji9csQUiRqjkg5TwGoKqwAQuf/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1ydCorE4Ji9csQUiRqjkg5TwGoKqwAQuf/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1Pg2ZoT5YH_NgAgj9n4-S6lXM3Bu4M2vO",
    "fileName": "Lever Reverse Hyperextension.mp4",
    "name": "Lever Reverse Hyperextension",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Reverse Hyperextension.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1Pg2ZoT5YH_NgAgj9n4-S6lXM3Bu4M2vO/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Pg2ZoT5YH_NgAgj9n4-S6lXM3Bu4M2vO/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1r8kzQA6QS-z670tmh1GDo2DLbUXoAgFV",
    "fileName": "Lever Reverse T-Bar Row.mp4",
    "name": "Lever Reverse T-Bar Row",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Reverse T-Bar Row.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1r8kzQA6QS-z670tmh1GDo2DLbUXoAgFV/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1r8kzQA6QS-z670tmh1GDo2DLbUXoAgFV/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1xj3BLy8oFpgcuccVZ6GLJRmqUVKHjcmL",
    "fileName": "Lever T-bar Row.mp4",
    "name": "Lever T-bar Row",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever T-bar Row.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1xj3BLy8oFpgcuccVZ6GLJRmqUVKHjcmL/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1xj3BLy8oFpgcuccVZ6GLJRmqUVKHjcmL/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1MjCeX5T_b1BMbwziESWMoTljWwWsLCO9",
    "fileName": "Pull-up (shoulder grip).mp4",
    "name": "Pull-up (shoulder grip)",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Pull-up (shoulder grip).",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1MjCeX5T_b1BMbwziESWMoTljWwWsLCO9/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1MjCeX5T_b1BMbwziESWMoTljWwWsLCO9/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1a98js05emvKnbvDgl3q9NtHs_iElFqm-",
    "fileName": "Pull-up (wide back grip).mp4",
    "name": "Pull-up (wide back grip)",
    "gender": "WOMEN",
    "subfolderCategory": "Back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Pull-up (wide back grip).",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1a98js05emvKnbvDgl3q9NtHs_iElFqm-/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1a98js05emvKnbvDgl3q9NtHs_iElFqm-/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Back"
    ]
  },
  {
    "id": "1Hop6Slhk3fBP7ezY1u36brObXbrwBoYE",
    "fileName": "Barbell Curl.mp4",
    "name": "Barbell Curl",
    "gender": "WOMEN",
    "subfolderCategory": "Biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Curl.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/1Hop6Slhk3fBP7ezY1u36brObXbrwBoYE/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Hop6Slhk3fBP7ezY1u36brObXbrwBoYE/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Biceps"
    ]
  },
  {
    "id": "1sKCk0PqIDgct7WwDpv3VZD5i59YCbpR4",
    "fileName": "Barbell Drag Curl.mp4",
    "name": "Barbell Drag Curl",
    "gender": "WOMEN",
    "subfolderCategory": "Biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Drag Curl.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/1sKCk0PqIDgct7WwDpv3VZD5i59YCbpR4/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1sKCk0PqIDgct7WwDpv3VZD5i59YCbpR4/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Biceps"
    ]
  },
  {
    "id": "1LApttmTUQcU-qqHrPNaLtG_BkXo_56S6",
    "fileName": "Cable One Arm Curl.mp4",
    "name": "Cable One Arm Curl",
    "gender": "WOMEN",
    "subfolderCategory": "Biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable One Arm Curl.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/1LApttmTUQcU-qqHrPNaLtG_BkXo_56S6/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1LApttmTUQcU-qqHrPNaLtG_BkXo_56S6/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Biceps"
    ]
  },
  {
    "id": "1tIQkV8y31yUl8UEuTMZD2qsL6eMgNCv1",
    "fileName": "Cable Standing Inner Curl.mp4",
    "name": "Cable Standing Inner Curl",
    "gender": "WOMEN",
    "subfolderCategory": "Biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Standing Inner Curl.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/1tIQkV8y31yUl8UEuTMZD2qsL6eMgNCv1/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1tIQkV8y31yUl8UEuTMZD2qsL6eMgNCv1/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Biceps"
    ]
  },
  {
    "id": "1Utv4R2rdP0isOBA-dkwaWEkBtX_eiWHr",
    "fileName": "Dumbbell Alternate Biceps Curl.mp4",
    "name": "Dumbbell Alternate Biceps Curl",
    "gender": "WOMEN",
    "subfolderCategory": "Biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Alternate Biceps Curl.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/1Utv4R2rdP0isOBA-dkwaWEkBtX_eiWHr/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Utv4R2rdP0isOBA-dkwaWEkBtX_eiWHr/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Biceps"
    ]
  },
  {
    "id": "1P1l9PQd1Z3ncCypOlcvvEvchkGyv_Cmp",
    "fileName": "Dumbbell Alternate Seated Biceps Curl.mp4",
    "name": "Dumbbell Alternate Seated Biceps Curl",
    "gender": "WOMEN",
    "subfolderCategory": "Biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Alternate Seated Biceps Curl.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/1P1l9PQd1Z3ncCypOlcvvEvchkGyv_Cmp/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1P1l9PQd1Z3ncCypOlcvvEvchkGyv_Cmp/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Biceps"
    ]
  },
  {
    "id": "1ZonwtCXMYdJtVjl99bHlvISn4J-CecYj",
    "fileName": "Dumbbell Biceps Curl.mp4",
    "name": "Dumbbell Biceps Curl",
    "gender": "WOMEN",
    "subfolderCategory": "Biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Biceps Curl.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/1ZonwtCXMYdJtVjl99bHlvISn4J-CecYj/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1ZonwtCXMYdJtVjl99bHlvISn4J-CecYj/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Biceps"
    ]
  },
  {
    "id": "1t17Mm0JpLhzFffevfr3DnhEbeUNjA1Q6",
    "fileName": "Dumbbell Concentration Curl.mp4",
    "name": "Dumbbell Concentration Curl",
    "gender": "WOMEN",
    "subfolderCategory": "Biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Concentration Curl.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/1t17Mm0JpLhzFffevfr3DnhEbeUNjA1Q6/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1t17Mm0JpLhzFffevfr3DnhEbeUNjA1Q6/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Biceps"
    ]
  },
  {
    "id": "1tWe9E-wRl6OYtyTTFalFzGtbqz-53CR-",
    "fileName": "Dumbbell Cross Body Hammer Curl.mp4",
    "name": "Dumbbell Cross Body Hammer Curl",
    "gender": "WOMEN",
    "subfolderCategory": "Biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Cross Body Hammer Curl.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/1tWe9E-wRl6OYtyTTFalFzGtbqz-53CR-/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1tWe9E-wRl6OYtyTTFalFzGtbqz-53CR-/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Biceps"
    ]
  },
  {
    "id": "1jQ6Rw4HCBh6_BdC7ODUCV_cHX9TRmSe-",
    "fileName": "Dumbbell Incline Biceps Curl.mp4",
    "name": "Dumbbell Incline Biceps Curl",
    "gender": "WOMEN",
    "subfolderCategory": "Biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Incline Biceps Curl.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/1jQ6Rw4HCBh6_BdC7ODUCV_cHX9TRmSe-/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1jQ6Rw4HCBh6_BdC7ODUCV_cHX9TRmSe-/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Biceps"
    ]
  },
  {
    "id": "1skxO3zXnkboQaE9MvZot0yaRL_574ayK",
    "fileName": "Dumbbell Incline Curl.mp4",
    "name": "Dumbbell Incline Curl",
    "gender": "WOMEN",
    "subfolderCategory": "Biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Incline Curl.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/1skxO3zXnkboQaE9MvZot0yaRL_574ayK/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1skxO3zXnkboQaE9MvZot0yaRL_574ayK/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Biceps"
    ]
  },
  {
    "id": "1HEwPNw-4fvKEB1Brvzhkcg5W820L8u-n",
    "fileName": "Dumbbell Incline Hammer Curl.mp4",
    "name": "Dumbbell Incline Hammer Curl",
    "gender": "WOMEN",
    "subfolderCategory": "Biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Incline Hammer Curl.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/1HEwPNw-4fvKEB1Brvzhkcg5W820L8u-n/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1HEwPNw-4fvKEB1Brvzhkcg5W820L8u-n/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Biceps"
    ]
  },
  {
    "id": "1SfknmivGTQDM7DVojm0Ka_p8nXs-GEs6",
    "fileName": "Dumbbell One Arm Zottman Preacher Curl.mp4",
    "name": "Dumbbell One Arm Zottman Preacher Curl",
    "gender": "WOMEN",
    "subfolderCategory": "Biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell One Arm Zottman Preacher Curl.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/1SfknmivGTQDM7DVojm0Ka_p8nXs-GEs6/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1SfknmivGTQDM7DVojm0Ka_p8nXs-GEs6/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Biceps"
    ]
  },
  {
    "id": "1OrLhatZgi3JsqcGZIwppwnhXfmhMj7EI",
    "fileName": "Dumbbell Preacher Curl Over Exercise Ball.mp4",
    "name": "Dumbbell Preacher Curl Over Exercise Ball",
    "gender": "WOMEN",
    "subfolderCategory": "Biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Preacher Curl Over Exercise Ball.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/1OrLhatZgi3JsqcGZIwppwnhXfmhMj7EI/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1OrLhatZgi3JsqcGZIwppwnhXfmhMj7EI/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Biceps"
    ]
  },
  {
    "id": "1I1ClgQIv5xcQN7XjmRXra5hdeUKpG648",
    "fileName": "Dumbbell Prone Incline Curl.mp4",
    "name": "Dumbbell Prone Incline Curl",
    "gender": "WOMEN",
    "subfolderCategory": "Biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Prone Incline Curl.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/1I1ClgQIv5xcQN7XjmRXra5hdeUKpG648/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1I1ClgQIv5xcQN7XjmRXra5hdeUKpG648/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Biceps"
    ]
  },
  {
    "id": "1qzFycsnJCuHRJWLclfPcucR-HUDVIV4s",
    "fileName": "Dumbbell Seated Preacher Curl.mp4",
    "name": "Dumbbell Seated Preacher Curl",
    "gender": "WOMEN",
    "subfolderCategory": "Biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Seated Preacher Curl.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/1qzFycsnJCuHRJWLclfPcucR-HUDVIV4s/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1qzFycsnJCuHRJWLclfPcucR-HUDVIV4s/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Biceps"
    ]
  },
  {
    "id": "1ucuyg_aSExpQlu4RC9GvWxGJzExLZ_W9",
    "fileName": "EZ Barbell Biceps Curl.mp4",
    "name": "EZ Barbell Biceps Curl",
    "gender": "WOMEN",
    "subfolderCategory": "Biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for EZ Barbell Biceps Curl.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/1ucuyg_aSExpQlu4RC9GvWxGJzExLZ_W9/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1ucuyg_aSExpQlu4RC9GvWxGJzExLZ_W9/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Biceps"
    ]
  },
  {
    "id": "1_5wXk2aQYnSIoXiBb1jjOSCWeSUrJyDO",
    "fileName": "Lever Preacher Curl.mp4",
    "name": "Lever Preacher Curl",
    "gender": "WOMEN",
    "subfolderCategory": "Biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Preacher Curl.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/1_5wXk2aQYnSIoXiBb1jjOSCWeSUrJyDO/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1_5wXk2aQYnSIoXiBb1jjOSCWeSUrJyDO/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Biceps"
    ]
  },
  {
    "id": "1_9AdMTECtfGEEeRrI3tdtTTdLti3jsZq",
    "fileName": "Lying Supine Dumbbell Curl.mp4",
    "name": "Lying Supine Dumbbell Curl",
    "gender": "WOMEN",
    "subfolderCategory": "Biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lying Supine Dumbbell Curl.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/1_9AdMTECtfGEEeRrI3tdtTTdLti3jsZq/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1_9AdMTECtfGEEeRrI3tdtTTdLti3jsZq/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Biceps"
    ]
  },
  {
    "id": "15OaVVDasSn9-h7_-BzovJbCs3SdS27tP",
    "fileName": "Stretching - Butterfly Yoga Pose.mp4",
    "name": "Stretching - Butterfly Yoga Pose",
    "gender": "WOMEN",
    "subfolderCategory": "Biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Butterfly Yoga Pose.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/15OaVVDasSn9-h7_-BzovJbCs3SdS27tP/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/15OaVVDasSn9-h7_-BzovJbCs3SdS27tP/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Biceps"
    ]
  },
  {
    "id": "1pVFbpQnrRo-pszwOqv0_YHTG_0rpK101",
    "fileName": "Band Standing Calf Raise.mp4",
    "name": "Band Standing Calf Raise",
    "gender": "WOMEN",
    "subfolderCategory": "Calves",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gastrocnemius & Soleus",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Standing Calf Raise.",
      "02 Movement: Perform controlled execution targeting Gastrocnemius & Soleus.",
      "03 Form lock: Pause 2 seconds at full stretch, drive through ball of big toe."
    ],
    "keyFormTip": "Pause 2 seconds at full stretch, drive through ball of big toe.",
    "driveUrl": "https://drive.google.com/file/d/1pVFbpQnrRo-pszwOqv0_YHTG_0rpK101/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1pVFbpQnrRo-pszwOqv0_YHTG_0rpK101/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Calves"
    ]
  },
  {
    "id": "12lh9uF7LkKZawk4eS6-5QkuUv3Kd0_0g",
    "fileName": "Barbell Clean And Press.mp4",
    "name": "Barbell Clean And Press",
    "gender": "WOMEN",
    "subfolderCategory": "Calves",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gastrocnemius & Soleus",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Clean And Press.",
      "02 Movement: Perform controlled execution targeting Gastrocnemius & Soleus.",
      "03 Form lock: Pause 2 seconds at full stretch, drive through ball of big toe."
    ],
    "keyFormTip": "Pause 2 seconds at full stretch, drive through ball of big toe.",
    "driveUrl": "https://drive.google.com/file/d/12lh9uF7LkKZawk4eS6-5QkuUv3Kd0_0g/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/12lh9uF7LkKZawk4eS6-5QkuUv3Kd0_0g/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Calves"
    ]
  },
  {
    "id": "1QsNdv1xYVn1W8AsUDJzqofGFcQk9T4Ci",
    "fileName": "Donkey Calf Raise.mp4",
    "name": "Donkey Calf Raise",
    "gender": "WOMEN",
    "subfolderCategory": "Calves",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gastrocnemius & Soleus",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Donkey Calf Raise.",
      "02 Movement: Perform controlled execution targeting Gastrocnemius & Soleus.",
      "03 Form lock: Pause 2 seconds at full stretch, drive through ball of big toe."
    ],
    "keyFormTip": "Pause 2 seconds at full stretch, drive through ball of big toe.",
    "driveUrl": "https://drive.google.com/file/d/1QsNdv1xYVn1W8AsUDJzqofGFcQk9T4Ci/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1QsNdv1xYVn1W8AsUDJzqofGFcQk9T4Ci/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Calves"
    ]
  },
  {
    "id": "1CsNHLyvQ7_fKxs2uJcPdUzmYm5lQpyM7",
    "fileName": "Dumbbell Front Squat.mp4",
    "name": "Dumbbell Front Squat",
    "gender": "WOMEN",
    "subfolderCategory": "Calves",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gastrocnemius & Soleus",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Front Squat.",
      "02 Movement: Perform controlled execution targeting Gastrocnemius & Soleus.",
      "03 Form lock: Pause 2 seconds at full stretch, drive through ball of big toe."
    ],
    "keyFormTip": "Pause 2 seconds at full stretch, drive through ball of big toe.",
    "driveUrl": "https://drive.google.com/file/d/1CsNHLyvQ7_fKxs2uJcPdUzmYm5lQpyM7/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1CsNHLyvQ7_fKxs2uJcPdUzmYm5lQpyM7/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Calves"
    ]
  },
  {
    "id": "1NFO5A-U0MuaO7RhaHv7vlRiJc5Cyb4_S",
    "fileName": "Dumbbell Seated Calf Raise.mp4",
    "name": "Dumbbell Seated Calf Raise",
    "gender": "WOMEN",
    "subfolderCategory": "Calves",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gastrocnemius & Soleus",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Seated Calf Raise.",
      "02 Movement: Perform controlled execution targeting Gastrocnemius & Soleus.",
      "03 Form lock: Pause 2 seconds at full stretch, drive through ball of big toe."
    ],
    "keyFormTip": "Pause 2 seconds at full stretch, drive through ball of big toe.",
    "driveUrl": "https://drive.google.com/file/d/1NFO5A-U0MuaO7RhaHv7vlRiJc5Cyb4_S/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1NFO5A-U0MuaO7RhaHv7vlRiJc5Cyb4_S/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Calves"
    ]
  },
  {
    "id": "18D8wqN9oWPj4jL9q5NtjsNMpljrVqNQt",
    "fileName": "Dumbbell Single Leg Calf Raise.mp4",
    "name": "Dumbbell Single Leg Calf Raise",
    "gender": "WOMEN",
    "subfolderCategory": "Calves",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gastrocnemius & Soleus",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Single Leg Calf Raise.",
      "02 Movement: Perform controlled execution targeting Gastrocnemius & Soleus.",
      "03 Form lock: Pause 2 seconds at full stretch, drive through ball of big toe."
    ],
    "keyFormTip": "Pause 2 seconds at full stretch, drive through ball of big toe.",
    "driveUrl": "https://drive.google.com/file/d/18D8wqN9oWPj4jL9q5NtjsNMpljrVqNQt/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/18D8wqN9oWPj4jL9q5NtjsNMpljrVqNQt/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Calves"
    ]
  },
  {
    "id": "1ZDrL58Eunj3ceKAGypCnM7BOgxppqrK_",
    "fileName": "Dumbbell Standing Calf Raise.mp4",
    "name": "Dumbbell Standing Calf Raise",
    "gender": "WOMEN",
    "subfolderCategory": "Calves",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gastrocnemius & Soleus",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Standing Calf Raise.",
      "02 Movement: Perform controlled execution targeting Gastrocnemius & Soleus.",
      "03 Form lock: Pause 2 seconds at full stretch, drive through ball of big toe."
    ],
    "keyFormTip": "Pause 2 seconds at full stretch, drive through ball of big toe.",
    "driveUrl": "https://drive.google.com/file/d/1ZDrL58Eunj3ceKAGypCnM7BOgxppqrK_/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1ZDrL58Eunj3ceKAGypCnM7BOgxppqrK_/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Calves"
    ]
  },
  {
    "id": "1Dt61qrDINTgT0ClaVtIg5bq3dnr4rcmm",
    "fileName": "Lever Seated Calf Raise.mp4",
    "name": "Lever Seated Calf Raise",
    "gender": "WOMEN",
    "subfolderCategory": "Calves",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gastrocnemius & Soleus",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Seated Calf Raise.",
      "02 Movement: Perform controlled execution targeting Gastrocnemius & Soleus.",
      "03 Form lock: Pause 2 seconds at full stretch, drive through ball of big toe."
    ],
    "keyFormTip": "Pause 2 seconds at full stretch, drive through ball of big toe.",
    "driveUrl": "https://drive.google.com/file/d/1Dt61qrDINTgT0ClaVtIg5bq3dnr4rcmm/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Dt61qrDINTgT0ClaVtIg5bq3dnr4rcmm/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Calves"
    ]
  },
  {
    "id": "1ZrlcLqtY5GEYJ58vj8BnjGLFUJqyeTFA",
    "fileName": "Lever Standing Calf Raise.mp4",
    "name": "Lever Standing Calf Raise",
    "gender": "WOMEN",
    "subfolderCategory": "Calves",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gastrocnemius & Soleus",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Standing Calf Raise.",
      "02 Movement: Perform controlled execution targeting Gastrocnemius & Soleus.",
      "03 Form lock: Pause 2 seconds at full stretch, drive through ball of big toe."
    ],
    "keyFormTip": "Pause 2 seconds at full stretch, drive through ball of big toe.",
    "driveUrl": "https://drive.google.com/file/d/1ZrlcLqtY5GEYJ58vj8BnjGLFUJqyeTFA/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1ZrlcLqtY5GEYJ58vj8BnjGLFUJqyeTFA/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Calves"
    ]
  },
  {
    "id": "1uTmeGvBaeRaWakpkJWoAvARkPdfUNfVE",
    "fileName": "Sled 45 Degree Calf Press.mp4",
    "name": "Sled 45 Degree Calf Press",
    "gender": "WOMEN",
    "subfolderCategory": "Calves",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gastrocnemius & Soleus",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Sled 45 Degree Calf Press.",
      "02 Movement: Perform controlled execution targeting Gastrocnemius & Soleus.",
      "03 Form lock: Pause 2 seconds at full stretch, drive through ball of big toe."
    ],
    "keyFormTip": "Pause 2 seconds at full stretch, drive through ball of big toe.",
    "driveUrl": "https://drive.google.com/file/d/1uTmeGvBaeRaWakpkJWoAvARkPdfUNfVE/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1uTmeGvBaeRaWakpkJWoAvARkPdfUNfVE/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Calves"
    ]
  },
  {
    "id": "15AOwH239Hkcol6Rjm_z0deJrs59II6is",
    "fileName": "Smith Calf Raise.mp4",
    "name": "Smith Calf Raise",
    "gender": "WOMEN",
    "subfolderCategory": "Calves",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gastrocnemius & Soleus",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Smith Calf Raise.",
      "02 Movement: Perform controlled execution targeting Gastrocnemius & Soleus.",
      "03 Form lock: Pause 2 seconds at full stretch, drive through ball of big toe."
    ],
    "keyFormTip": "Pause 2 seconds at full stretch, drive through ball of big toe.",
    "driveUrl": "https://drive.google.com/file/d/15AOwH239Hkcol6Rjm_z0deJrs59II6is/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/15AOwH239Hkcol6Rjm_z0deJrs59II6is/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Calves"
    ]
  },
  {
    "id": "1HTqSUXiNkdJShQIH3_ATi4UJNC1aiQSE",
    "fileName": "Stretching - Calf Stretch with Rope.mp4",
    "name": "Stretching - Calf Stretch with Rope",
    "gender": "WOMEN",
    "subfolderCategory": "Calves",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gastrocnemius & Soleus",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Calf Stretch with Rope.",
      "02 Movement: Perform controlled execution targeting Gastrocnemius & Soleus.",
      "03 Form lock: Pause 2 seconds at full stretch, drive through ball of big toe."
    ],
    "keyFormTip": "Pause 2 seconds at full stretch, drive through ball of big toe.",
    "driveUrl": "https://drive.google.com/file/d/1HTqSUXiNkdJShQIH3_ATi4UJNC1aiQSE/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1HTqSUXiNkdJShQIH3_ATi4UJNC1aiQSE/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Calves"
    ]
  },
  {
    "id": "1n-bThcMsMxhXDbn4biX8Mq7mWFhizqUR",
    "fileName": "Stretching - Calf Stretch with Strap.mp4",
    "name": "Stretching - Calf Stretch with Strap",
    "gender": "WOMEN",
    "subfolderCategory": "Calves",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gastrocnemius & Soleus",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Calf Stretch with Strap.",
      "02 Movement: Perform controlled execution targeting Gastrocnemius & Soleus.",
      "03 Form lock: Pause 2 seconds at full stretch, drive through ball of big toe."
    ],
    "keyFormTip": "Pause 2 seconds at full stretch, drive through ball of big toe.",
    "driveUrl": "https://drive.google.com/file/d/1n-bThcMsMxhXDbn4biX8Mq7mWFhizqUR/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1n-bThcMsMxhXDbn4biX8Mq7mWFhizqUR/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Calves"
    ]
  },
  {
    "id": "1X_gGUd0NTpmYLnevpZNlitYFGQtMs_XX",
    "fileName": "Stretching - Circles Knee Stretch.mp4",
    "name": "Stretching - Circles Knee Stretch",
    "gender": "WOMEN",
    "subfolderCategory": "Calves",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gastrocnemius & Soleus",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Circles Knee Stretch.",
      "02 Movement: Perform controlled execution targeting Gastrocnemius & Soleus.",
      "03 Form lock: Pause 2 seconds at full stretch, drive through ball of big toe."
    ],
    "keyFormTip": "Pause 2 seconds at full stretch, drive through ball of big toe.",
    "driveUrl": "https://drive.google.com/file/d/1X_gGUd0NTpmYLnevpZNlitYFGQtMs_XX/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1X_gGUd0NTpmYLnevpZNlitYFGQtMs_XX/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Calves"
    ]
  },
  {
    "id": "1-s_pwrOwXwJXjLHUHU4XnAlETgsi1uNk",
    "fileName": "Stretching - Feet and Ankles Rotation Stretch.mp4",
    "name": "Stretching - Feet and Ankles Rotation Stretch",
    "gender": "WOMEN",
    "subfolderCategory": "Calves",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gastrocnemius & Soleus",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Feet and Ankles Rotation Stretch.",
      "02 Movement: Perform controlled execution targeting Gastrocnemius & Soleus.",
      "03 Form lock: Pause 2 seconds at full stretch, drive through ball of big toe."
    ],
    "keyFormTip": "Pause 2 seconds at full stretch, drive through ball of big toe.",
    "driveUrl": "https://drive.google.com/file/d/1-s_pwrOwXwJXjLHUHU4XnAlETgsi1uNk/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1-s_pwrOwXwJXjLHUHU4XnAlETgsi1uNk/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Calves"
    ]
  },
  {
    "id": "1p5DF9nYgHSA1jZEx-UlLZJbHwRhKTlzZ",
    "fileName": "Stretching - Feet and Ankles Stretch.mp4",
    "name": "Stretching - Feet and Ankles Stretch",
    "gender": "WOMEN",
    "subfolderCategory": "Calves",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gastrocnemius & Soleus",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Feet and Ankles Stretch.",
      "02 Movement: Perform controlled execution targeting Gastrocnemius & Soleus.",
      "03 Form lock: Pause 2 seconds at full stretch, drive through ball of big toe."
    ],
    "keyFormTip": "Pause 2 seconds at full stretch, drive through ball of big toe.",
    "driveUrl": "https://drive.google.com/file/d/1p5DF9nYgHSA1jZEx-UlLZJbHwRhKTlzZ/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1p5DF9nYgHSA1jZEx-UlLZJbHwRhKTlzZ/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Calves"
    ]
  },
  {
    "id": "1x1RVLWyz2B1TYOgocwISltrk4Ncj6p5-",
    "fileName": "Stretching - Peroneals Stretch.mp4",
    "name": "Stretching - Peroneals Stretch",
    "gender": "WOMEN",
    "subfolderCategory": "Calves",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gastrocnemius & Soleus",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Peroneals Stretch.",
      "02 Movement: Perform controlled execution targeting Gastrocnemius & Soleus.",
      "03 Form lock: Pause 2 seconds at full stretch, drive through ball of big toe."
    ],
    "keyFormTip": "Pause 2 seconds at full stretch, drive through ball of big toe.",
    "driveUrl": "https://drive.google.com/file/d/1x1RVLWyz2B1TYOgocwISltrk4Ncj6p5-/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1x1RVLWyz2B1TYOgocwISltrk4Ncj6p5-/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Calves"
    ]
  },
  {
    "id": "1tmHnlXhYZLMF9oWpfBLunp_hTc9Ui48Q",
    "fileName": "Stretching - Seated Calf Stretch.mp4",
    "name": "Stretching - Seated Calf Stretch",
    "gender": "WOMEN",
    "subfolderCategory": "Calves",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gastrocnemius & Soleus",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Seated Calf Stretch.",
      "02 Movement: Perform controlled execution targeting Gastrocnemius & Soleus.",
      "03 Form lock: Pause 2 seconds at full stretch, drive through ball of big toe."
    ],
    "keyFormTip": "Pause 2 seconds at full stretch, drive through ball of big toe.",
    "driveUrl": "https://drive.google.com/file/d/1tmHnlXhYZLMF9oWpfBLunp_hTc9Ui48Q/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1tmHnlXhYZLMF9oWpfBLunp_hTc9Ui48Q/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Calves"
    ]
  },
  {
    "id": "1OtoWkRe68wgMZPohwuLa5mhF_6NTFfq6",
    "fileName": "Stretching - Stairs Calf Stretch.mp4",
    "name": "Stretching - Stairs Calf Stretch",
    "gender": "WOMEN",
    "subfolderCategory": "Calves",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gastrocnemius & Soleus",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Stairs Calf Stretch.",
      "02 Movement: Perform controlled execution targeting Gastrocnemius & Soleus.",
      "03 Form lock: Pause 2 seconds at full stretch, drive through ball of big toe."
    ],
    "keyFormTip": "Pause 2 seconds at full stretch, drive through ball of big toe.",
    "driveUrl": "https://drive.google.com/file/d/1OtoWkRe68wgMZPohwuLa5mhF_6NTFfq6/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1OtoWkRe68wgMZPohwuLa5mhF_6NTFfq6/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Calves"
    ]
  },
  {
    "id": "1LCvYf_3s_hO_GAY5yACKhMitDVP5B7B5",
    "fileName": "Stretching - Standing Bench Calf Stretch.mp4",
    "name": "Stretching - Standing Bench Calf Stretch",
    "gender": "WOMEN",
    "subfolderCategory": "Calves",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gastrocnemius & Soleus",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Standing Bench Calf Stretch.",
      "02 Movement: Perform controlled execution targeting Gastrocnemius & Soleus.",
      "03 Form lock: Pause 2 seconds at full stretch, drive through ball of big toe."
    ],
    "keyFormTip": "Pause 2 seconds at full stretch, drive through ball of big toe.",
    "driveUrl": "https://drive.google.com/file/d/1LCvYf_3s_hO_GAY5yACKhMitDVP5B7B5/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1LCvYf_3s_hO_GAY5yACKhMitDVP5B7B5/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Calves"
    ]
  },
  {
    "id": "1oDJSpE8Mhoc_f3aICoKSVW24OrRK-MAH",
    "fileName": "Battling Ropes.mp4",
    "name": "Battling Ropes",
    "gender": "WOMEN",
    "subfolderCategory": "Cardio",
    "muscleGroup": "CARDIO",
    "targetMuscles": "Cardiovascular System & Full Body Conditioning",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "45-60s",
    "suggestedRestSeconds": 30,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Battling Ropes.",
      "02 Movement: Perform controlled execution targeting Cardiovascular System & Full Body Conditioning.",
      "03 Form lock: Maintain continuous rhythm, keep core tight and breathe rhythmically."
    ],
    "keyFormTip": "Maintain continuous rhythm, keep core tight and breathe rhythmically.",
    "driveUrl": "https://drive.google.com/file/d/1oDJSpE8Mhoc_f3aICoKSVW24OrRK-MAH/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1oDJSpE8Mhoc_f3aICoKSVW24OrRK-MAH/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Cardio"
    ]
  },
  {
    "id": "1YLk8MtD3nqPY6SY2NGMbASLcsqK2Ucx3",
    "fileName": "Burpee.mp4",
    "name": "Burpee",
    "gender": "WOMEN",
    "subfolderCategory": "Cardio",
    "muscleGroup": "CARDIO",
    "targetMuscles": "Cardiovascular System & Full Body Conditioning",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "45-60s",
    "suggestedRestSeconds": 30,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Burpee.",
      "02 Movement: Perform controlled execution targeting Cardiovascular System & Full Body Conditioning.",
      "03 Form lock: Maintain continuous rhythm, keep core tight and breathe rhythmically."
    ],
    "keyFormTip": "Maintain continuous rhythm, keep core tight and breathe rhythmically.",
    "driveUrl": "https://drive.google.com/file/d/1YLk8MtD3nqPY6SY2NGMbASLcsqK2Ucx3/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1YLk8MtD3nqPY6SY2NGMbASLcsqK2Ucx3/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Cardio"
    ]
  },
  {
    "id": "1kzLVsaXhN7G7mTpdBya6UdsHajZ7Sr1F",
    "fileName": "Cardio Exercises Machine.mp4",
    "name": "Cardio Exercises Machine",
    "gender": "WOMEN",
    "subfolderCategory": "Cardio",
    "muscleGroup": "CARDIO",
    "targetMuscles": "Cardiovascular System & Full Body Conditioning",
    "equipment": "FULL_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "45-60s",
    "suggestedRestSeconds": 30,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cardio Exercises Machine.",
      "02 Movement: Perform controlled execution targeting Cardiovascular System & Full Body Conditioning.",
      "03 Form lock: Maintain continuous rhythm, keep core tight and breathe rhythmically."
    ],
    "keyFormTip": "Maintain continuous rhythm, keep core tight and breathe rhythmically.",
    "driveUrl": "https://drive.google.com/file/d/1kzLVsaXhN7G7mTpdBya6UdsHajZ7Sr1F/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1kzLVsaXhN7G7mTpdBya6UdsHajZ7Sr1F/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Cardio"
    ]
  },
  {
    "id": "1jifkVIbby-h-PubXZVm-noujseOiKjOb",
    "fileName": "Cardio Exercises.mp4",
    "name": "Cardio Exercises",
    "gender": "WOMEN",
    "subfolderCategory": "Cardio",
    "muscleGroup": "CARDIO",
    "targetMuscles": "Cardiovascular System & Full Body Conditioning",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "45-60s",
    "suggestedRestSeconds": 30,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cardio Exercises.",
      "02 Movement: Perform controlled execution targeting Cardiovascular System & Full Body Conditioning.",
      "03 Form lock: Maintain continuous rhythm, keep core tight and breathe rhythmically."
    ],
    "keyFormTip": "Maintain continuous rhythm, keep core tight and breathe rhythmically.",
    "driveUrl": "https://drive.google.com/file/d/1jifkVIbby-h-PubXZVm-noujseOiKjOb/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1jifkVIbby-h-PubXZVm-noujseOiKjOb/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Cardio"
    ]
  },
  {
    "id": "13SEdeqvsBRMkyhcmcOkqjIQzNj3--zgW",
    "fileName": "Elliptical.mp4",
    "name": "Elliptical",
    "gender": "WOMEN",
    "subfolderCategory": "Cardio",
    "muscleGroup": "CARDIO",
    "targetMuscles": "Cardiovascular System & Full Body Conditioning",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "45-60s",
    "suggestedRestSeconds": 30,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Elliptical.",
      "02 Movement: Perform controlled execution targeting Cardiovascular System & Full Body Conditioning.",
      "03 Form lock: Maintain continuous rhythm, keep core tight and breathe rhythmically."
    ],
    "keyFormTip": "Maintain continuous rhythm, keep core tight and breathe rhythmically.",
    "driveUrl": "https://drive.google.com/file/d/13SEdeqvsBRMkyhcmcOkqjIQzNj3--zgW/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/13SEdeqvsBRMkyhcmcOkqjIQzNj3--zgW/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Cardio"
    ]
  },
  {
    "id": "134xNjWjrWz4HOT6qJEhdaRJFOlfW1UsG",
    "fileName": "Jump Rope.mp4",
    "name": "Jump Rope",
    "gender": "WOMEN",
    "subfolderCategory": "Cardio",
    "muscleGroup": "CARDIO",
    "targetMuscles": "Cardiovascular System & Full Body Conditioning",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "45-60s",
    "suggestedRestSeconds": 30,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Jump Rope.",
      "02 Movement: Perform controlled execution targeting Cardiovascular System & Full Body Conditioning.",
      "03 Form lock: Maintain continuous rhythm, keep core tight and breathe rhythmically."
    ],
    "keyFormTip": "Maintain continuous rhythm, keep core tight and breathe rhythmically.",
    "driveUrl": "https://drive.google.com/file/d/134xNjWjrWz4HOT6qJEhdaRJFOlfW1UsG/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/134xNjWjrWz4HOT6qJEhdaRJFOlfW1UsG/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Cardio"
    ]
  },
  {
    "id": "1JRteZ32StX5MeXIDSMlV434qbSJGlE3s",
    "fileName": "Jump Step-up.mp4",
    "name": "Jump Step-up",
    "gender": "WOMEN",
    "subfolderCategory": "Cardio",
    "muscleGroup": "CARDIO",
    "targetMuscles": "Cardiovascular System & Full Body Conditioning",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "45-60s",
    "suggestedRestSeconds": 30,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Jump Step-up.",
      "02 Movement: Perform controlled execution targeting Cardiovascular System & Full Body Conditioning.",
      "03 Form lock: Maintain continuous rhythm, keep core tight and breathe rhythmically."
    ],
    "keyFormTip": "Maintain continuous rhythm, keep core tight and breathe rhythmically.",
    "driveUrl": "https://drive.google.com/file/d/1JRteZ32StX5MeXIDSMlV434qbSJGlE3s/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1JRteZ32StX5MeXIDSMlV434qbSJGlE3s/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Cardio"
    ]
  },
  {
    "id": "13BAhFVej1IjdOgoyOFHiVfRSILB-Ep38",
    "fileName": "Jumping Jack.mp4",
    "name": "Jumping Jack",
    "gender": "WOMEN",
    "subfolderCategory": "Cardio",
    "muscleGroup": "CARDIO",
    "targetMuscles": "Cardiovascular System & Full Body Conditioning",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "45-60s",
    "suggestedRestSeconds": 30,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Jumping Jack.",
      "02 Movement: Perform controlled execution targeting Cardiovascular System & Full Body Conditioning.",
      "03 Form lock: Maintain continuous rhythm, keep core tight and breathe rhythmically."
    ],
    "keyFormTip": "Maintain continuous rhythm, keep core tight and breathe rhythmically.",
    "driveUrl": "https://drive.google.com/file/d/13BAhFVej1IjdOgoyOFHiVfRSILB-Ep38/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/13BAhFVej1IjdOgoyOFHiVfRSILB-Ep38/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Cardio"
    ]
  },
  {
    "id": "1P6rZ1bk8Dkg8vBJHcECvVWgdgPe2leZA",
    "fileName": "Running.mp4",
    "name": "Running",
    "gender": "WOMEN",
    "subfolderCategory": "Cardio",
    "muscleGroup": "CARDIO",
    "targetMuscles": "Cardiovascular System & Full Body Conditioning",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "45-60s",
    "suggestedRestSeconds": 30,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Running.",
      "02 Movement: Perform controlled execution targeting Cardiovascular System & Full Body Conditioning.",
      "03 Form lock: Maintain continuous rhythm, keep core tight and breathe rhythmically."
    ],
    "keyFormTip": "Maintain continuous rhythm, keep core tight and breathe rhythmically.",
    "driveUrl": "https://drive.google.com/file/d/1P6rZ1bk8Dkg8vBJHcECvVWgdgPe2leZA/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1P6rZ1bk8Dkg8vBJHcECvVWgdgPe2leZA/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Cardio"
    ]
  },
  {
    "id": "1_Pz5luZnny20LcuGRoDnntrEu3Mw9pfX",
    "fileName": "Stationary Bike.mp4",
    "name": "Stationary Bike",
    "gender": "WOMEN",
    "subfolderCategory": "Cardio",
    "muscleGroup": "CARDIO",
    "targetMuscles": "Cardiovascular System & Full Body Conditioning",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "45-60s",
    "suggestedRestSeconds": 30,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stationary Bike.",
      "02 Movement: Perform controlled execution targeting Cardiovascular System & Full Body Conditioning.",
      "03 Form lock: Maintain continuous rhythm, keep core tight and breathe rhythmically."
    ],
    "keyFormTip": "Maintain continuous rhythm, keep core tight and breathe rhythmically.",
    "driveUrl": "https://drive.google.com/file/d/1_Pz5luZnny20LcuGRoDnntrEu3Mw9pfX/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1_Pz5luZnny20LcuGRoDnntrEu3Mw9pfX/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Cardio"
    ]
  },
  {
    "id": "1VlCQa9bVIECV7xPJp53zxQRfmkztgTaC",
    "fileName": "Stretching - Bridge Pose Setu Bandhasana.mp4",
    "name": "Stretching - Bridge Pose Setu Bandhasana",
    "gender": "WOMEN",
    "subfolderCategory": "Cardio",
    "muscleGroup": "CARDIO",
    "targetMuscles": "Cardiovascular System & Full Body Conditioning",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "45-60s",
    "suggestedRestSeconds": 30,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Bridge Pose Setu Bandhasana.",
      "02 Movement: Perform controlled execution targeting Cardiovascular System & Full Body Conditioning.",
      "03 Form lock: Maintain continuous rhythm, keep core tight and breathe rhythmically."
    ],
    "keyFormTip": "Maintain continuous rhythm, keep core tight and breathe rhythmically.",
    "driveUrl": "https://drive.google.com/file/d/1VlCQa9bVIECV7xPJp53zxQRfmkztgTaC/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1VlCQa9bVIECV7xPJp53zxQRfmkztgTaC/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Cardio"
    ]
  },
  {
    "id": "1BqzHRlV7Z0WhHTaz9nbH5woArAMdRAG_",
    "fileName": "Stretching - Flexion Leg Sit-up.mp4",
    "name": "Stretching - Flexion Leg Sit-up",
    "gender": "WOMEN",
    "subfolderCategory": "Cardio",
    "muscleGroup": "CARDIO",
    "targetMuscles": "Cardiovascular System & Full Body Conditioning",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "45-60s",
    "suggestedRestSeconds": 30,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Flexion Leg Sit-up.",
      "02 Movement: Perform controlled execution targeting Cardiovascular System & Full Body Conditioning.",
      "03 Form lock: Maintain continuous rhythm, keep core tight and breathe rhythmically."
    ],
    "keyFormTip": "Maintain continuous rhythm, keep core tight and breathe rhythmically.",
    "driveUrl": "https://drive.google.com/file/d/1BqzHRlV7Z0WhHTaz9nbH5woArAMdRAG_/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1BqzHRlV7Z0WhHTaz9nbH5woArAMdRAG_/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Cardio"
    ]
  },
  {
    "id": "16ZFwNSKUC35Zc4JniX6-KvRnt0F5eHiT",
    "fileName": "Stretching - Front Toe Touch.mp4",
    "name": "Stretching - Front Toe Touch",
    "gender": "WOMEN",
    "subfolderCategory": "Cardio",
    "muscleGroup": "CARDIO",
    "targetMuscles": "Cardiovascular System & Full Body Conditioning",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "45-60s",
    "suggestedRestSeconds": 30,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Front Toe Touch.",
      "02 Movement: Perform controlled execution targeting Cardiovascular System & Full Body Conditioning.",
      "03 Form lock: Maintain continuous rhythm, keep core tight and breathe rhythmically."
    ],
    "keyFormTip": "Maintain continuous rhythm, keep core tight and breathe rhythmically.",
    "driveUrl": "https://drive.google.com/file/d/16ZFwNSKUC35Zc4JniX6-KvRnt0F5eHiT/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/16ZFwNSKUC35Zc4JniX6-KvRnt0F5eHiT/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Cardio"
    ]
  },
  {
    "id": "1Y931r0l57ssYA-Vt69q9WvTMW4brSoOL",
    "fileName": "Stretching - Plyo Side Lunge Stretch.mp4",
    "name": "Stretching - Plyo Side Lunge Stretch",
    "gender": "WOMEN",
    "subfolderCategory": "Cardio",
    "muscleGroup": "CARDIO",
    "targetMuscles": "Cardiovascular System & Full Body Conditioning",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "45-60s",
    "suggestedRestSeconds": 30,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Plyo Side Lunge Stretch.",
      "02 Movement: Perform controlled execution targeting Cardiovascular System & Full Body Conditioning.",
      "03 Form lock: Maintain continuous rhythm, keep core tight and breathe rhythmically."
    ],
    "keyFormTip": "Maintain continuous rhythm, keep core tight and breathe rhythmically.",
    "driveUrl": "https://drive.google.com/file/d/1Y931r0l57ssYA-Vt69q9WvTMW4brSoOL/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Y931r0l57ssYA-Vt69q9WvTMW4brSoOL/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Cardio"
    ]
  },
  {
    "id": "1ANI29heqnHaZhe2vkXuAAr9e3Qhn21XY",
    "fileName": "Stretching - Single Leg Stretch (bent knee).mp4",
    "name": "Stretching - Single Leg Stretch (bent knee)",
    "gender": "WOMEN",
    "subfolderCategory": "Cardio",
    "muscleGroup": "CARDIO",
    "targetMuscles": "Cardiovascular System & Full Body Conditioning",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "45-60s",
    "suggestedRestSeconds": 30,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Single Leg Stretch (bent knee).",
      "02 Movement: Perform controlled execution targeting Cardiovascular System & Full Body Conditioning.",
      "03 Form lock: Maintain continuous rhythm, keep core tight and breathe rhythmically."
    ],
    "keyFormTip": "Maintain continuous rhythm, keep core tight and breathe rhythmically.",
    "driveUrl": "https://drive.google.com/file/d/1ANI29heqnHaZhe2vkXuAAr9e3Qhn21XY/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1ANI29heqnHaZhe2vkXuAAr9e3Qhn21XY/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Cardio"
    ]
  },
  {
    "id": "1zhmg9peEgb1Actmodiz8SnAlA5URQjai",
    "fileName": "Stretching - Single Straight Leg Stretch.mp4",
    "name": "Stretching - Single Straight Leg Stretch",
    "gender": "WOMEN",
    "subfolderCategory": "Cardio",
    "muscleGroup": "CARDIO",
    "targetMuscles": "Cardiovascular System & Full Body Conditioning",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "45-60s",
    "suggestedRestSeconds": 30,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Single Straight Leg Stretch.",
      "02 Movement: Perform controlled execution targeting Cardiovascular System & Full Body Conditioning.",
      "03 Form lock: Maintain continuous rhythm, keep core tight and breathe rhythmically."
    ],
    "keyFormTip": "Maintain continuous rhythm, keep core tight and breathe rhythmically.",
    "driveUrl": "https://drive.google.com/file/d/1zhmg9peEgb1Actmodiz8SnAlA5URQjai/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1zhmg9peEgb1Actmodiz8SnAlA5URQjai/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Cardio"
    ]
  },
  {
    "id": "1s-YPou-YkBMV5FDBXUhvQMXdunTf0Q6x",
    "fileName": "Treadmill Running.mp4",
    "name": "Treadmill Running",
    "gender": "WOMEN",
    "subfolderCategory": "Cardio",
    "muscleGroup": "CARDIO",
    "targetMuscles": "Cardiovascular System & Full Body Conditioning",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "45-60s",
    "suggestedRestSeconds": 30,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Treadmill Running.",
      "02 Movement: Perform controlled execution targeting Cardiovascular System & Full Body Conditioning.",
      "03 Form lock: Maintain continuous rhythm, keep core tight and breathe rhythmically."
    ],
    "keyFormTip": "Maintain continuous rhythm, keep core tight and breathe rhythmically.",
    "driveUrl": "https://drive.google.com/file/d/1s-YPou-YkBMV5FDBXUhvQMXdunTf0Q6x/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1s-YPou-YkBMV5FDBXUhvQMXdunTf0Q6x/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Cardio"
    ]
  },
  {
    "id": "1FxVd7h4a_bmDv895eVbm5xmQSTBQFqiS",
    "fileName": "Walk Wave Machine.mp4",
    "name": "Walk Wave Machine",
    "gender": "WOMEN",
    "subfolderCategory": "Cardio",
    "muscleGroup": "CARDIO",
    "targetMuscles": "Cardiovascular System & Full Body Conditioning",
    "equipment": "FULL_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "45-60s",
    "suggestedRestSeconds": 30,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Walk Wave Machine.",
      "02 Movement: Perform controlled execution targeting Cardiovascular System & Full Body Conditioning.",
      "03 Form lock: Maintain continuous rhythm, keep core tight and breathe rhythmically."
    ],
    "keyFormTip": "Maintain continuous rhythm, keep core tight and breathe rhythmically.",
    "driveUrl": "https://drive.google.com/file/d/1FxVd7h4a_bmDv895eVbm5xmQSTBQFqiS/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1FxVd7h4a_bmDv895eVbm5xmQSTBQFqiS/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Cardio"
    ]
  },
  {
    "id": "12cQnOlKZYn_ztgOD_EJDkgtJ9CY_WEX2",
    "fileName": "Band High Fly.mp4",
    "name": "Band High Fly",
    "gender": "WOMEN",
    "subfolderCategory": "Chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band High Fly.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/12cQnOlKZYn_ztgOD_EJDkgtJ9CY_WEX2/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/12cQnOlKZYn_ztgOD_EJDkgtJ9CY_WEX2/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Chest"
    ]
  },
  {
    "id": "1knDiNs9kTjW7-awsueXifOsUWkFSPVA9",
    "fileName": "Barbell Bench Press.mp4",
    "name": "Barbell Bench Press",
    "gender": "WOMEN",
    "subfolderCategory": "Chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Bench Press.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1knDiNs9kTjW7-awsueXifOsUWkFSPVA9/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1knDiNs9kTjW7-awsueXifOsUWkFSPVA9/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Chest"
    ]
  },
  {
    "id": "1ZhYP7nmQKVZ8yFc-BY15kx6bzk2rg4qK",
    "fileName": "Barbell Decline Bench Press.mp4",
    "name": "Barbell Decline Bench Press",
    "gender": "WOMEN",
    "subfolderCategory": "Chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Decline Bench Press.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1ZhYP7nmQKVZ8yFc-BY15kx6bzk2rg4qK/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1ZhYP7nmQKVZ8yFc-BY15kx6bzk2rg4qK/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Chest"
    ]
  },
  {
    "id": "16flaPcbElxmGCKkDvBR77Bj-qN4rmqhj",
    "fileName": "Barbell Incline Bench Press.mp4",
    "name": "Barbell Incline Bench Press",
    "gender": "WOMEN",
    "subfolderCategory": "Chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Incline Bench Press.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/16flaPcbElxmGCKkDvBR77Bj-qN4rmqhj/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/16flaPcbElxmGCKkDvBR77Bj-qN4rmqhj/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Chest"
    ]
  },
  {
    "id": "1qhcIUxXo85hj_Igzfvv6IUiacmGZO8l_",
    "fileName": "Cable Lying Fly, Flat Bench Cable Fly.mp4",
    "name": "Cable Lying Fly, Flat Bench Cable Fly",
    "gender": "WOMEN",
    "subfolderCategory": "Chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Lying Fly, Flat Bench Cable Fly.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1qhcIUxXo85hj_Igzfvv6IUiacmGZO8l_/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1qhcIUxXo85hj_Igzfvv6IUiacmGZO8l_/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Chest"
    ]
  },
  {
    "id": "1k74s_x_8d4cNFP9KGwmg8lpFCEPNm40c",
    "fileName": "Cable Standing Fly, Crossover fly.mp4",
    "name": "Cable Standing Fly, Crossover fly",
    "gender": "WOMEN",
    "subfolderCategory": "Chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Standing Fly, Crossover fly.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1k74s_x_8d4cNFP9KGwmg8lpFCEPNm40c/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1k74s_x_8d4cNFP9KGwmg8lpFCEPNm40c/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Chest"
    ]
  },
  {
    "id": "1rmY_cfw_zJBKjFraVAuUN7b30-jq6mQj",
    "fileName": "Chest Dips.mp4",
    "name": "Chest Dips",
    "gender": "WOMEN",
    "subfolderCategory": "Chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Chest Dips.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1rmY_cfw_zJBKjFraVAuUN7b30-jq6mQj/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1rmY_cfw_zJBKjFraVAuUN7b30-jq6mQj/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Chest"
    ]
  },
  {
    "id": "1vVD1OH75-RAjXc_wzdBjOe6Ag1C0uj3L",
    "fileName": "Decline Dumbbell Bench Press (45 degree).mp4",
    "name": "Decline Dumbbell Bench Press (45 degree)",
    "gender": "WOMEN",
    "subfolderCategory": "Chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "DUMBBELLS",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Decline Dumbbell Bench Press (45 degree).",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1vVD1OH75-RAjXc_wzdBjOe6Ag1C0uj3L/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1vVD1OH75-RAjXc_wzdBjOe6Ag1C0uj3L/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Chest"
    ]
  },
  {
    "id": "17Yg6wtee-O4nlRan1igVp12YqOMYWFZJ",
    "fileName": "Deep Push-ups.mp4",
    "name": "Deep Push-ups",
    "gender": "WOMEN",
    "subfolderCategory": "Chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Deep Push-ups.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/17Yg6wtee-O4nlRan1igVp12YqOMYWFZJ/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/17Yg6wtee-O4nlRan1igVp12YqOMYWFZJ/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Chest"
    ]
  },
  {
    "id": "1eDDH1rRyqwacBMXs-yk7GQ7NQ3k4WpvM",
    "fileName": "Dumbbell Bench Press.mp4",
    "name": "Dumbbell Bench Press",
    "gender": "WOMEN",
    "subfolderCategory": "Chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Bench Press.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1eDDH1rRyqwacBMXs-yk7GQ7NQ3k4WpvM/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1eDDH1rRyqwacBMXs-yk7GQ7NQ3k4WpvM/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Chest"
    ]
  },
  {
    "id": "1zRqv0lYwnyOBNiR3sDKBX1on8WJQRCgC",
    "fileName": "Dumbbell Decline Fly (45 degree).mp4",
    "name": "Dumbbell Decline Fly (45 degree)",
    "gender": "WOMEN",
    "subfolderCategory": "Chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "DUMBBELLS",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Decline Fly (45 degree).",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1zRqv0lYwnyOBNiR3sDKBX1on8WJQRCgC/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1zRqv0lYwnyOBNiR3sDKBX1on8WJQRCgC/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Chest"
    ]
  },
  {
    "id": "1lo5ZglIqGWzCXkUJ5ElOCoCrwuSaL9l1",
    "fileName": "Dumbbell Fly On Exercise Ball.mp4",
    "name": "Dumbbell Fly On Exercise Ball",
    "gender": "WOMEN",
    "subfolderCategory": "Chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Fly On Exercise Ball.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1lo5ZglIqGWzCXkUJ5ElOCoCrwuSaL9l1/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1lo5ZglIqGWzCXkUJ5ElOCoCrwuSaL9l1/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Chest"
    ]
  },
  {
    "id": "1pjaMpmmnqyFzH5AYc8cKZvu03Ay3U0h5",
    "fileName": "Dumbbell Fly.mp4",
    "name": "Dumbbell Fly",
    "gender": "WOMEN",
    "subfolderCategory": "Chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Fly.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1pjaMpmmnqyFzH5AYc8cKZvu03Ay3U0h5/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1pjaMpmmnqyFzH5AYc8cKZvu03Ay3U0h5/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Chest"
    ]
  },
  {
    "id": "14MBbrCYEaIshYZje5lUw5EudfjHuU2bf",
    "fileName": "Dumbbell Incline Bench Press.mp4",
    "name": "Dumbbell Incline Bench Press",
    "gender": "WOMEN",
    "subfolderCategory": "Chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Incline Bench Press.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/14MBbrCYEaIshYZje5lUw5EudfjHuU2bf/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/14MBbrCYEaIshYZje5lUw5EudfjHuU2bf/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Chest"
    ]
  },
  {
    "id": "1baJuHB1Md0jLcrLvnnngjknKybLLLKAs",
    "fileName": "Dumbbell Incline Fly On Exercise Ball.mp4",
    "name": "Dumbbell Incline Fly On Exercise Ball",
    "gender": "WOMEN",
    "subfolderCategory": "Chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Incline Fly On Exercise Ball.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1baJuHB1Md0jLcrLvnnngjknKybLLLKAs/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1baJuHB1Md0jLcrLvnnngjknKybLLLKAs/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Chest"
    ]
  },
  {
    "id": "1LgNQbuL5dv-dpFR-5CtAPPa7f6xcXA0a",
    "fileName": "Dumbbell Incline Fly.mp4",
    "name": "Dumbbell Incline Fly",
    "gender": "WOMEN",
    "subfolderCategory": "Chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Incline Fly.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1LgNQbuL5dv-dpFR-5CtAPPa7f6xcXA0a/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1LgNQbuL5dv-dpFR-5CtAPPa7f6xcXA0a/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Chest"
    ]
  },
  {
    "id": "1iIAnm72fDePKZr6CZ04BiaZwh3vs-u8f",
    "fileName": "Dumbbell Lying Hammer Press.mp4",
    "name": "Dumbbell Lying Hammer Press",
    "gender": "WOMEN",
    "subfolderCategory": "Chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Lying Hammer Press.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1iIAnm72fDePKZr6CZ04BiaZwh3vs-u8f/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1iIAnm72fDePKZr6CZ04BiaZwh3vs-u8f/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Chest"
    ]
  },
  {
    "id": "1ApjANpMg9aW13P4BgDkgkDBlGroUceXl",
    "fileName": "Incline Push-Ups.mp4",
    "name": "Incline Push-Ups",
    "gender": "WOMEN",
    "subfolderCategory": "Chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Incline Push-Ups.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1ApjANpMg9aW13P4BgDkgkDBlGroUceXl/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1ApjANpMg9aW13P4BgDkgkDBlGroUceXl/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Chest"
    ]
  },
  {
    "id": "1QUzZWlKtVjIKeqgH0tdYCtZd13LTXSkk",
    "fileName": "Lever Chest Press.mp4",
    "name": "Lever Chest Press",
    "gender": "WOMEN",
    "subfolderCategory": "Chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Chest Press.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1QUzZWlKtVjIKeqgH0tdYCtZd13LTXSkk/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1QUzZWlKtVjIKeqgH0tdYCtZd13LTXSkk/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Chest"
    ]
  },
  {
    "id": "1a2Bl3_aj2PWhxd3Ca8iXeezfWp3i7WZh",
    "fileName": "Lever Incline Hammer Chest Press.mp4",
    "name": "Lever Incline Hammer Chest Press",
    "gender": "WOMEN",
    "subfolderCategory": "Chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Incline Hammer Chest Press.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1a2Bl3_aj2PWhxd3Ca8iXeezfWp3i7WZh/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1a2Bl3_aj2PWhxd3Ca8iXeezfWp3i7WZh/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Chest"
    ]
  },
  {
    "id": "1-ZeHof98fqgduaocBsvCI7wS8yLHUFuR",
    "fileName": "Lever Lying Chest Press.mp4",
    "name": "Lever Lying Chest Press",
    "gender": "WOMEN",
    "subfolderCategory": "Chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Lying Chest Press.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1-ZeHof98fqgduaocBsvCI7wS8yLHUFuR/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1-ZeHof98fqgduaocBsvCI7wS8yLHUFuR/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Chest"
    ]
  },
  {
    "id": "1Xb_crmCm-vCkCmC4Fdlri-eoV2dgaKxX",
    "fileName": "Lever Pec Deck Fly.mp4",
    "name": "Lever Pec Deck Fly",
    "gender": "WOMEN",
    "subfolderCategory": "Chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Pec Deck Fly.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1Xb_crmCm-vCkCmC4Fdlri-eoV2dgaKxX/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Xb_crmCm-vCkCmC4Fdlri-eoV2dgaKxX/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Chest"
    ]
  },
  {
    "id": "1L-yZJJcS86Zfvhp018Bbfab1iZSYoayD",
    "fileName": "Push-ups.mp4",
    "name": "Push-ups",
    "gender": "WOMEN",
    "subfolderCategory": "Chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Push-ups.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1L-yZJJcS86Zfvhp018Bbfab1iZSYoayD/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1L-yZJJcS86Zfvhp018Bbfab1iZSYoayD/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Chest"
    ]
  },
  {
    "id": "1vfLOOFz5Vk1MX-iwPNzRAsQxm2jlTvkz",
    "fileName": "Stretching - Above Head Chest Stretch.mp4",
    "name": "Stretching - Above Head Chest Stretch",
    "gender": "WOMEN",
    "subfolderCategory": "Chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Above Head Chest Stretch.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1vfLOOFz5Vk1MX-iwPNzRAsQxm2jlTvkz/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1vfLOOFz5Vk1MX-iwPNzRAsQxm2jlTvkz/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Chest"
    ]
  },
  {
    "id": "1UpjrtBmr6gX7Z6_p5lTJ3UMxzkPx_LL4",
    "fileName": "Stretching - Back Pec Stretch.mp4",
    "name": "Stretching - Back Pec Stretch",
    "gender": "WOMEN",
    "subfolderCategory": "Chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Back Pec Stretch.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1UpjrtBmr6gX7Z6_p5lTJ3UMxzkPx_LL4/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1UpjrtBmr6gX7Z6_p5lTJ3UMxzkPx_LL4/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Chest"
    ]
  },
  {
    "id": "1f7XkTs__wHq_FyWSAfAjmiTD_EKmjiSy",
    "fileName": "Stretching - Dynamic Chest Stretch.mp4",
    "name": "Stretching - Dynamic Chest Stretch",
    "gender": "WOMEN",
    "subfolderCategory": "Chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Dynamic Chest Stretch.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1f7XkTs__wHq_FyWSAfAjmiTD_EKmjiSy/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1f7XkTs__wHq_FyWSAfAjmiTD_EKmjiSy/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Chest"
    ]
  },
  {
    "id": "1l2O-2HDE8tRdeAXvevhHMY99qVFK2q9v",
    "fileName": "Stretching - Kneeling Back Rotation Stretch.mp4",
    "name": "Stretching - Kneeling Back Rotation Stretch",
    "gender": "WOMEN",
    "subfolderCategory": "Chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Kneeling Back Rotation Stretch.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1l2O-2HDE8tRdeAXvevhHMY99qVFK2q9v/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1l2O-2HDE8tRdeAXvevhHMY99qVFK2q9v/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Chest"
    ]
  },
  {
    "id": "1fvfF-6W6jwgdjmJwa0pD6vaPZfusdTOs",
    "fileName": "Stretching - Standing Reach Up Back Rotation Stretch.mp4",
    "name": "Stretching - Standing Reach Up Back Rotation Stretch",
    "gender": "WOMEN",
    "subfolderCategory": "Chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Standing Reach Up Back Rotation Stretch.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1fvfF-6W6jwgdjmJwa0pD6vaPZfusdTOs/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1fvfF-6W6jwgdjmJwa0pD6vaPZfusdTOs/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Chest"
    ]
  },
  {
    "id": "1bkc2AavI-JAIx_CHkkFyaoyr90bT9HhL",
    "fileName": "Stretching - Standing Wheel Rollout.mp4",
    "name": "Stretching - Standing Wheel Rollout",
    "gender": "WOMEN",
    "subfolderCategory": "Chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Standing Wheel Rollout.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1bkc2AavI-JAIx_CHkkFyaoyr90bT9HhL/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1bkc2AavI-JAIx_CHkkFyaoyr90bT9HhL/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Chest"
    ]
  },
  {
    "id": "1_cxA7J2sZ40Xd6KDW7Z43qpyeITiQPgU",
    "fileName": "Triceps Dips.mp4",
    "name": "Triceps Dips",
    "gender": "WOMEN",
    "subfolderCategory": "Chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Triceps Dips.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1_cxA7J2sZ40Xd6KDW7Z43qpyeITiQPgU/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1_cxA7J2sZ40Xd6KDW7Z43qpyeITiQPgU/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Chest"
    ]
  },
  {
    "id": "1aLqZ6ap0TfFw4ZIY5OchZohVNPjOePci",
    "fileName": "Wide Grip Push-ups.mp4",
    "name": "Wide Grip Push-ups",
    "gender": "WOMEN",
    "subfolderCategory": "Chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Wide Grip Push-ups.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1aLqZ6ap0TfFw4ZIY5OchZohVNPjOePci/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1aLqZ6ap0TfFw4ZIY5OchZohVNPjOePci/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Chest"
    ]
  },
  {
    "id": "1V-9V_UXt-Kw13AiM165WjEECBLn8frPn",
    "fileName": "Barbell Reverse Wrist Curl (over-grip).mp4",
    "name": "Barbell Reverse Wrist Curl (over-grip)",
    "gender": "WOMEN",
    "subfolderCategory": "Forearms",
    "muscleGroup": "ARMS",
    "targetMuscles": "Brachioradialis, Wrist Flexors & Extensors",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Reverse Wrist Curl (over-grip).",
      "02 Movement: Perform controlled execution targeting Brachioradialis, Wrist Flexors & Extensors.",
      "03 Form lock: Control both flexion and extension without swinging momentum."
    ],
    "keyFormTip": "Control both flexion and extension without swinging momentum.",
    "driveUrl": "https://drive.google.com/file/d/1V-9V_UXt-Kw13AiM165WjEECBLn8frPn/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1V-9V_UXt-Kw13AiM165WjEECBLn8frPn/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Forearms"
    ]
  },
  {
    "id": "1TMBk2kUZjIDdQ5uN-LsIB4z0_rFJITwo",
    "fileName": "Barbell Standing Back Wrist Curl.mp4",
    "name": "Barbell Standing Back Wrist Curl",
    "gender": "WOMEN",
    "subfolderCategory": "Forearms",
    "muscleGroup": "ARMS",
    "targetMuscles": "Brachioradialis, Wrist Flexors & Extensors",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Standing Back Wrist Curl.",
      "02 Movement: Perform controlled execution targeting Brachioradialis, Wrist Flexors & Extensors.",
      "03 Form lock: Control both flexion and extension without swinging momentum."
    ],
    "keyFormTip": "Control both flexion and extension without swinging momentum.",
    "driveUrl": "https://drive.google.com/file/d/1TMBk2kUZjIDdQ5uN-LsIB4z0_rFJITwo/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1TMBk2kUZjIDdQ5uN-LsIB4z0_rFJITwo/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Forearms"
    ]
  },
  {
    "id": "1gaKD1wFCdDx2eKm0idYf1IV5dNhdlWMr",
    "fileName": "Dumbbell Behind Back Wrist Curl.mp4",
    "name": "Dumbbell Behind Back Wrist Curl",
    "gender": "WOMEN",
    "subfolderCategory": "Forearms",
    "muscleGroup": "ARMS",
    "targetMuscles": "Brachioradialis, Wrist Flexors & Extensors",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Behind Back Wrist Curl.",
      "02 Movement: Perform controlled execution targeting Brachioradialis, Wrist Flexors & Extensors.",
      "03 Form lock: Control both flexion and extension without swinging momentum."
    ],
    "keyFormTip": "Control both flexion and extension without swinging momentum.",
    "driveUrl": "https://drive.google.com/file/d/1gaKD1wFCdDx2eKm0idYf1IV5dNhdlWMr/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1gaKD1wFCdDx2eKm0idYf1IV5dNhdlWMr/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Forearms"
    ]
  },
  {
    "id": "1cu6wFOR78v1oIhgVQ8mWaKud-ITwuWF_",
    "fileName": "Dumbbell Over Bench Wrist Curl.mp4",
    "name": "Dumbbell Over Bench Wrist Curl",
    "gender": "WOMEN",
    "subfolderCategory": "Forearms",
    "muscleGroup": "ARMS",
    "targetMuscles": "Brachioradialis, Wrist Flexors & Extensors",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Over Bench Wrist Curl.",
      "02 Movement: Perform controlled execution targeting Brachioradialis, Wrist Flexors & Extensors.",
      "03 Form lock: Control both flexion and extension without swinging momentum."
    ],
    "keyFormTip": "Control both flexion and extension without swinging momentum.",
    "driveUrl": "https://drive.google.com/file/d/1cu6wFOR78v1oIhgVQ8mWaKud-ITwuWF_/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1cu6wFOR78v1oIhgVQ8mWaKud-ITwuWF_/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Forearms"
    ]
  },
  {
    "id": "1ix75Lo1C8Slhyp7rTUBsNKIqNyxCF3s7",
    "fileName": "Dumbbell Seated Neutral Wrist Curl.mp4",
    "name": "Dumbbell Seated Neutral Wrist Curl",
    "gender": "WOMEN",
    "subfolderCategory": "Forearms",
    "muscleGroup": "ARMS",
    "targetMuscles": "Brachioradialis, Wrist Flexors & Extensors",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Seated Neutral Wrist Curl.",
      "02 Movement: Perform controlled execution targeting Brachioradialis, Wrist Flexors & Extensors.",
      "03 Form lock: Control both flexion and extension without swinging momentum."
    ],
    "keyFormTip": "Control both flexion and extension without swinging momentum.",
    "driveUrl": "https://drive.google.com/file/d/1ix75Lo1C8Slhyp7rTUBsNKIqNyxCF3s7/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1ix75Lo1C8Slhyp7rTUBsNKIqNyxCF3s7/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Forearms"
    ]
  },
  {
    "id": "1TYbNU01rCcK5oRmavV4Cy_4syWXour02",
    "fileName": "Stretching - Side Wrist Pull Stretch.mp4",
    "name": "Stretching - Side Wrist Pull Stretch",
    "gender": "WOMEN",
    "subfolderCategory": "Forearms",
    "muscleGroup": "ARMS",
    "targetMuscles": "Brachioradialis, Wrist Flexors & Extensors",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Side Wrist Pull Stretch.",
      "02 Movement: Perform controlled execution targeting Brachioradialis, Wrist Flexors & Extensors.",
      "03 Form lock: Control both flexion and extension without swinging momentum."
    ],
    "keyFormTip": "Control both flexion and extension without swinging momentum.",
    "driveUrl": "https://drive.google.com/file/d/1TYbNU01rCcK5oRmavV4Cy_4syWXour02/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1TYbNU01rCcK5oRmavV4Cy_4syWXour02/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Forearms"
    ]
  },
  {
    "id": "1JdyM3MqgGuOYXCWL4uFQ8KEUWmOfItWi",
    "fileName": "Stretching - Wrist Circles.mp4",
    "name": "Stretching - Wrist Circles",
    "gender": "WOMEN",
    "subfolderCategory": "Forearms",
    "muscleGroup": "ARMS",
    "targetMuscles": "Brachioradialis, Wrist Flexors & Extensors",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Wrist Circles.",
      "02 Movement: Perform controlled execution targeting Brachioradialis, Wrist Flexors & Extensors.",
      "03 Form lock: Control both flexion and extension without swinging momentum."
    ],
    "keyFormTip": "Control both flexion and extension without swinging momentum.",
    "driveUrl": "https://drive.google.com/file/d/1JdyM3MqgGuOYXCWL4uFQ8KEUWmOfItWi/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1JdyM3MqgGuOYXCWL4uFQ8KEUWmOfItWi/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Forearms"
    ]
  },
  {
    "id": "1GGU0j6m6xF4qb6e7-HF9Qwspq2mDxluF",
    "fileName": "Weighted Standing Curl (weights or lever).mp4",
    "name": "Weighted Standing Curl (weights or lever)",
    "gender": "WOMEN",
    "subfolderCategory": "Forearms",
    "muscleGroup": "ARMS",
    "targetMuscles": "Brachioradialis, Wrist Flexors & Extensors",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Weighted Standing Curl (weights or lever).",
      "02 Movement: Perform controlled execution targeting Brachioradialis, Wrist Flexors & Extensors.",
      "03 Form lock: Control both flexion and extension without swinging momentum."
    ],
    "keyFormTip": "Control both flexion and extension without swinging momentum.",
    "driveUrl": "https://drive.google.com/file/d/1GGU0j6m6xF4qb6e7-HF9Qwspq2mDxluF/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1GGU0j6m6xF4qb6e7-HF9Qwspq2mDxluF/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Forearms"
    ]
  },
  {
    "id": "1BYBMzdOtKMurFSNp4kXtEIwcz2BovE3s",
    "fileName": "Band Bent Over Hip Extension.mp4",
    "name": "Band Bent Over Hip Extension",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Bent Over Hip Extension.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1BYBMzdOtKMurFSNp4kXtEIwcz2BovE3s/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1BYBMzdOtKMurFSNp4kXtEIwcz2BovE3s/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1oOsC4JmmJrPaXFSvkviulIlL702gbFUu",
    "fileName": "Band Hip Abduction.mp4",
    "name": "Band Hip Abduction",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Hip Abduction.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1oOsC4JmmJrPaXFSvkviulIlL702gbFUu/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1oOsC4JmmJrPaXFSvkviulIlL702gbFUu/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1-CZVJsD3tlHdN5lzNGxZOBG92aH-4qoP",
    "fileName": "Band Hip Adduction.mp4",
    "name": "Band Hip Adduction",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Hip Adduction.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1-CZVJsD3tlHdN5lzNGxZOBG92aH-4qoP/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1-CZVJsD3tlHdN5lzNGxZOBG92aH-4qoP/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1NfVEZ9W4SQkOlIZ1PTn25xMvtqR5vfM-",
    "fileName": "Band Leg Curl.mp4",
    "name": "Band Leg Curl",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Leg Curl.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1NfVEZ9W4SQkOlIZ1PTn25xMvtqR5vfM-/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1NfVEZ9W4SQkOlIZ1PTn25xMvtqR5vfM-/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1bntxS6dgRB3SAtbJhBuoQxg_IthBwVTA",
    "fileName": "Band Seated Leg Extension.mp4",
    "name": "Band Seated Leg Extension",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Seated Leg Extension.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1bntxS6dgRB3SAtbJhBuoQxg_IthBwVTA/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1bntxS6dgRB3SAtbJhBuoQxg_IthBwVTA/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "16uW_Jps60yyxFh8C_D1a0J2MTYyi1jgo",
    "fileName": "Band Standing Hip Extension.mp4",
    "name": "Band Standing Hip Extension",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Standing Hip Extension.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/16uW_Jps60yyxFh8C_D1a0J2MTYyi1jgo/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/16uW_Jps60yyxFh8C_D1a0J2MTYyi1jgo/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1p3Ku3XRcpBCphUaf4IdkxY3UoUoPl7CY",
    "fileName": "Band Standing Leg Curl.mp4",
    "name": "Band Standing Leg Curl",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Standing Leg Curl.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1p3Ku3XRcpBCphUaf4IdkxY3UoUoPl7CY/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1p3Ku3XRcpBCphUaf4IdkxY3UoUoPl7CY/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1rYLuAYr-fzyBOqZM7ue-iDkoYd0s1bxw",
    "fileName": "Barbell Clean And Press.mp4",
    "name": "Barbell Clean And Press",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Clean And Press.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1rYLuAYr-fzyBOqZM7ue-iDkoYd0s1bxw/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1rYLuAYr-fzyBOqZM7ue-iDkoYd0s1bxw/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1ULe5FgtApRwMt-MWJc_I2cK4jC-QV2hh",
    "fileName": "Barbell Front Chest Squat.mp4",
    "name": "Barbell Front Chest Squat",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Front Chest Squat.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1ULe5FgtApRwMt-MWJc_I2cK4jC-QV2hh/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1ULe5FgtApRwMt-MWJc_I2cK4jC-QV2hh/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1hs1CEfAs4JK3DIcrr3TnAjzH81APiOJx",
    "fileName": "Barbell Lunge.mp4",
    "name": "Barbell Lunge",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Lunge.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1hs1CEfAs4JK3DIcrr3TnAjzH81APiOJx/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1hs1CEfAs4JK3DIcrr3TnAjzH81APiOJx/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1m_WMYjv1_nSqEfgVuaL8ITU2sNtJQJlW",
    "fileName": "Classic Barbell Squat.mp4",
    "name": "Classic Barbell Squat",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Classic Barbell Squat.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1m_WMYjv1_nSqEfgVuaL8ITU2sNtJQJlW/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1m_WMYjv1_nSqEfgVuaL8ITU2sNtJQJlW/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "13nGayLAxpF_W9HW23daK0dDGAjYM36rn",
    "fileName": "Close Feet Leg Press.mp4",
    "name": "Close Feet Leg Press",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Close Feet Leg Press.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/13nGayLAxpF_W9HW23daK0dDGAjYM36rn/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/13nGayLAxpF_W9HW23daK0dDGAjYM36rn/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1z__Vztp_JAmVHMlrzz5xdTJf0_Sg9zpF",
    "fileName": "Dumbbell Bar Grip Sumo Squat.mp4",
    "name": "Dumbbell Bar Grip Sumo Squat",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Bar Grip Sumo Squat.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1z__Vztp_JAmVHMlrzz5xdTJf0_Sg9zpF/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1z__Vztp_JAmVHMlrzz5xdTJf0_Sg9zpF/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1Aa2S7AGYECQXUrmYxB68kBgOAF53rsg5",
    "fileName": "Dumbbell Front Squat.mp4",
    "name": "Dumbbell Front Squat",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Front Squat.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1Aa2S7AGYECQXUrmYxB68kBgOAF53rsg5/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Aa2S7AGYECQXUrmYxB68kBgOAF53rsg5/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1_oaKfqpwt4wkLD_7EKNMyve8gCuyctPt",
    "fileName": "Dumbbell Goblet Squat.mp4",
    "name": "Dumbbell Goblet Squat",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Goblet Squat.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1_oaKfqpwt4wkLD_7EKNMyve8gCuyctPt/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1_oaKfqpwt4wkLD_7EKNMyve8gCuyctPt/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1e9MFVNeD74VSbqbcaS_V6_Jlm9DEancE",
    "fileName": "Dumbbell Lunge.mp4",
    "name": "Dumbbell Lunge",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Lunge.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1e9MFVNeD74VSbqbcaS_V6_Jlm9DEancE/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1e9MFVNeD74VSbqbcaS_V6_Jlm9DEancE/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "190PSpiGyJBTu2PoIGLbFrjBlJaYTuGaI",
    "fileName": "Dumbbell Lying Femoral.mp4",
    "name": "Dumbbell Lying Femoral",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Lying Femoral.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/190PSpiGyJBTu2PoIGLbFrjBlJaYTuGaI/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/190PSpiGyJBTu2PoIGLbFrjBlJaYTuGaI/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1tKvY5nUrq3_CTazWQ3e5taWbvP_4EZIe",
    "fileName": "Dumbbell Single Leg Squat.mp4",
    "name": "Dumbbell Single Leg Squat",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Single Leg Squat.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1tKvY5nUrq3_CTazWQ3e5taWbvP_4EZIe/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1tKvY5nUrq3_CTazWQ3e5taWbvP_4EZIe/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1jGEyZvF2FU_xRDEXEc1uSggxe6UfnRbM",
    "fileName": "Dumbbell Squat.mp4",
    "name": "Dumbbell Squat",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Squat.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1jGEyZvF2FU_xRDEXEc1uSggxe6UfnRbM/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1jGEyZvF2FU_xRDEXEc1uSggxe6UfnRbM/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "11R6PT5KD_CkJzzB2F1tDkAaZ5e6-5yv8",
    "fileName": "Lever Horizontal Leg Press.mp4",
    "name": "Lever Horizontal Leg Press",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Horizontal Leg Press.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/11R6PT5KD_CkJzzB2F1tDkAaZ5e6-5yv8/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/11R6PT5KD_CkJzzB2F1tDkAaZ5e6-5yv8/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1QblE8sZAHC8-UAjGnWCfk9YgXQcR6DI1",
    "fileName": "Lever Kneeling Leg Curl.mp4",
    "name": "Lever Kneeling Leg Curl",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Kneeling Leg Curl.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1QblE8sZAHC8-UAjGnWCfk9YgXQcR6DI1/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1QblE8sZAHC8-UAjGnWCfk9YgXQcR6DI1/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "12QjyFR7vFhv-Jt52iCK1Jgx0yrhmiXOG",
    "fileName": "Lever Leg Extension.mp4",
    "name": "Lever Leg Extension",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Leg Extension.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/12QjyFR7vFhv-Jt52iCK1Jgx0yrhmiXOG/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/12QjyFR7vFhv-Jt52iCK1Jgx0yrhmiXOG/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1xHfryNHDWaylIKK-8aFU5uRKEs1cZH07",
    "fileName": "Lever Lying Leg Curl.mp4",
    "name": "Lever Lying Leg Curl",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Lying Leg Curl.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1xHfryNHDWaylIKK-8aFU5uRKEs1cZH07/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1xHfryNHDWaylIKK-8aFU5uRKEs1cZH07/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1EgsDPrYNcCtJ2RPprXvm3Ny5pL69SFFX",
    "fileName": "Lever Seated Hip Abduction.mp4",
    "name": "Lever Seated Hip Abduction",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Seated Hip Abduction.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1EgsDPrYNcCtJ2RPprXvm3Ny5pL69SFFX/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1EgsDPrYNcCtJ2RPprXvm3Ny5pL69SFFX/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1q6x-YQ7IiDSQe2fuA2KUqKC_GViCsPuy",
    "fileName": "Lever Seated Hip Adduction.mp4",
    "name": "Lever Seated Hip Adduction",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Seated Hip Adduction.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1q6x-YQ7IiDSQe2fuA2KUqKC_GViCsPuy/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1q6x-YQ7IiDSQe2fuA2KUqKC_GViCsPuy/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1SuBLg-WJISPC2-yz_YtIn3Vc6_EqdGDr",
    "fileName": "Lever Seated Leg Curl.mp4",
    "name": "Lever Seated Leg Curl",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Seated Leg Curl.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1SuBLg-WJISPC2-yz_YtIn3Vc6_EqdGDr/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1SuBLg-WJISPC2-yz_YtIn3Vc6_EqdGDr/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1iiRFXMKdlEoz7706NTMrPzA8A-91Ehst",
    "fileName": "Lever Standing Hip Extension.mp4",
    "name": "Lever Standing Hip Extension",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Standing Hip Extension.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1iiRFXMKdlEoz7706NTMrPzA8A-91Ehst/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1iiRFXMKdlEoz7706NTMrPzA8A-91Ehst/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1XNpbndSN4xbn9IVucCyhCguN8KTHCFuD",
    "fileName": "Lever Standing Rear Kick.mp4",
    "name": "Lever Standing Rear Kick",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Standing Rear Kick.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1XNpbndSN4xbn9IVucCyhCguN8KTHCFuD/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1XNpbndSN4xbn9IVucCyhCguN8KTHCFuD/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1cNTo7F3eWSk24Zw2VEhTJXoY2LJXxT_0",
    "fileName": "Rear Decline Bridge.mp4",
    "name": "Rear Decline Bridge",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Rear Decline Bridge.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1cNTo7F3eWSk24Zw2VEhTJXoY2LJXxT_0/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1cNTo7F3eWSk24Zw2VEhTJXoY2LJXxT_0/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1eaZVQ_IccqI0ZCy45Q6XXI97OA05FxHo",
    "fileName": "Sled 45 Degree Leg Wide Press.mp4",
    "name": "Sled 45 Degree Leg Wide Press",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Sled 45 Degree Leg Wide Press.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1eaZVQ_IccqI0ZCy45Q6XXI97OA05FxHo/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1eaZVQ_IccqI0ZCy45Q6XXI97OA05FxHo/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1B5XIyHdsnbYElh9iYsx4vYkKLvsVDg3e",
    "fileName": "Sled Hack Squat.mp4",
    "name": "Sled Hack Squat",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Sled Hack Squat.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1B5XIyHdsnbYElh9iYsx4vYkKLvsVDg3e/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1B5XIyHdsnbYElh9iYsx4vYkKLvsVDg3e/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1wohszhkifBvO8Isnm5VAvLPCfyfQikQY",
    "fileName": "Smith Chair Squat.mp4",
    "name": "Smith Chair Squat",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Smith Chair Squat.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1wohszhkifBvO8Isnm5VAvLPCfyfQikQY/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1wohszhkifBvO8Isnm5VAvLPCfyfQikQY/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1Erozo832twOwMrDiqGcM2pk0Fs3ERQ-o",
    "fileName": "Smith Leg Press.mp4",
    "name": "Smith Leg Press",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Smith Leg Press.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1Erozo832twOwMrDiqGcM2pk0Fs3ERQ-o/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Erozo832twOwMrDiqGcM2pk0Fs3ERQ-o/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "19FweSKjRnyf8cjT9xl65naVEaKIL7gFz",
    "fileName": "Squat.mp4",
    "name": "Squat",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Squat.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/19FweSKjRnyf8cjT9xl65naVEaKIL7gFz/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/19FweSKjRnyf8cjT9xl65naVEaKIL7gFz/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1eCu4v9avSQjr3trFj7XaZHI9adhsiwVP",
    "fileName": "Stretching - Adductor stretch.mp4",
    "name": "Stretching - Adductor stretch",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Adductor stretch.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1eCu4v9avSQjr3trFj7XaZHI9adhsiwVP/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1eCu4v9avSQjr3trFj7XaZHI9adhsiwVP/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1fNqTXBPhehBjzRPv5K6Nok10weUvrA-t",
    "fileName": "Stretching - All Fours Squad Stretch.mp4",
    "name": "Stretching - All Fours Squad Stretch",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - All Fours Squad Stretch.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1fNqTXBPhehBjzRPv5K6Nok10weUvrA-t/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1fNqTXBPhehBjzRPv5K6Nok10weUvrA-t/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1E1sNhcssfOLl2eX29FW2EH5Sr38bSFHb",
    "fileName": "Stretching - Boat Stretch.mp4",
    "name": "Stretching - Boat Stretch",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Boat Stretch.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1E1sNhcssfOLl2eX29FW2EH5Sr38bSFHb/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1E1sNhcssfOLl2eX29FW2EH5Sr38bSFHb/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1Ou31urkWGws7z-EQ62ALTquk7shZMIBL",
    "fileName": "Stretching - Ceiling Look Stretch.mp4",
    "name": "Stretching - Ceiling Look Stretch",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Ceiling Look Stretch.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1Ou31urkWGws7z-EQ62ALTquk7shZMIBL/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Ou31urkWGws7z-EQ62ALTquk7shZMIBL/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1doe1X7EynsSivweh6uPm-l6ZDpzof-ar",
    "fileName": "Stretching - Crossover Kneeling Hip Flexor Stretch.mp4",
    "name": "Stretching - Crossover Kneeling Hip Flexor Stretch",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Crossover Kneeling Hip Flexor Stretch.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1doe1X7EynsSivweh6uPm-l6ZDpzof-ar/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1doe1X7EynsSivweh6uPm-l6ZDpzof-ar/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1-JvnZ2uJD2fuAw3JkPLK60veI9m0izhN",
    "fileName": "Stretching - Hamstring Stretch.mp4",
    "name": "Stretching - Hamstring Stretch",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Hamstring Stretch.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1-JvnZ2uJD2fuAw3JkPLK60veI9m0izhN/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1-JvnZ2uJD2fuAw3JkPLK60veI9m0izhN/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "13qiyGa2zPpdPBC-tDaBnM29NgfCa5oTi",
    "fileName": "Stretching - Hip Circles Stretch.mp4",
    "name": "Stretching - Hip Circles Stretch",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Hip Circles Stretch.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/13qiyGa2zPpdPBC-tDaBnM29NgfCa5oTi/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/13qiyGa2zPpdPBC-tDaBnM29NgfCa5oTi/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1xj9QWjpX2nABWsmysEvGbjJZwba-fNJk",
    "fileName": "Stretching - Hip Extension Stretch.mp4",
    "name": "Stretching - Hip Extension Stretch",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Hip Extension Stretch.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1xj9QWjpX2nABWsmysEvGbjJZwba-fNJk/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1xj9QWjpX2nABWsmysEvGbjJZwba-fNJk/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1bIEZhAEo8s_3J0BvT27XpGQpEvPipQIL",
    "fileName": "Stretching - Hip Flexor and Quad Stretch.mp4",
    "name": "Stretching - Hip Flexor and Quad Stretch",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Hip Flexor and Quad Stretch.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1bIEZhAEo8s_3J0BvT27XpGQpEvPipQIL/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1bIEZhAEo8s_3J0BvT27XpGQpEvPipQIL/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1N_2oghdiQV2Iw2UTn0K32AxZUqOQ16zM",
    "fileName": "Stretching - Hip Flexor Stretch Rear foot elevated.mp4",
    "name": "Stretching - Hip Flexor Stretch Rear foot elevated",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Hip Flexor Stretch Rear foot elevated.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1N_2oghdiQV2Iw2UTn0K32AxZUqOQ16zM/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1N_2oghdiQV2Iw2UTn0K32AxZUqOQ16zM/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1Mp97Cw5KSIBLzs4ozv7KqWW0qL8ia1VK",
    "fileName": "Stretching - Knee Raise.mp4",
    "name": "Stretching - Knee Raise",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Knee Raise.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1Mp97Cw5KSIBLzs4ozv7KqWW0qL8ia1VK/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Mp97Cw5KSIBLzs4ozv7KqWW0qL8ia1VK/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "18cC9mVn5Vv2PgkKhZvh6lA6NqUNaSAr6",
    "fileName": "Stretching - Quadriceps lying stretch.mp4",
    "name": "Stretching - Quadriceps lying stretch",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Quadriceps lying stretch.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/18cC9mVn5Vv2PgkKhZvh6lA6NqUNaSAr6/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/18cC9mVn5Vv2PgkKhZvh6lA6NqUNaSAr6/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1xi5pSpUv09KBN5DXSfwR9VUxruCnvv5B",
    "fileName": "Stretching - Quadriceps stretch.mp4",
    "name": "Stretching - Quadriceps stretch",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Quadriceps stretch.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1xi5pSpUv09KBN5DXSfwR9VUxruCnvv5B/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1xi5pSpUv09KBN5DXSfwR9VUxruCnvv5B/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1LQ1uv8EmUNSKtAgtdLlLIoKfZfh8j6km",
    "fileName": "Stretching - Runners Stretch.mp4",
    "name": "Stretching - Runners Stretch",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Runners Stretch.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1LQ1uv8EmUNSKtAgtdLlLIoKfZfh8j6km/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1LQ1uv8EmUNSKtAgtdLlLIoKfZfh8j6km/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1emxxEABVbMWfSK_JKW7H7bdAAOTrDBeb",
    "fileName": "Weighted Sissy Squat.mp4",
    "name": "Weighted Sissy Squat",
    "gender": "WOMEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Weighted Sissy Squat.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1emxxEABVbMWfSK_JKW7H7bdAAOTrDBeb/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1emxxEABVbMWfSK_JKW7H7bdAAOTrDBeb/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Hips"
    ]
  },
  {
    "id": "1IGEjCAu0vFu4Ik12zWLy-yLhgnfjcOMX",
    "fileName": "Ball Sit-up (on stability ball).mp4",
    "name": "Ball Sit-up (on stability ball)",
    "gender": "WOMEN",
    "subfolderCategory": "mix",
    "muscleGroup": "FULL_BODY",
    "targetMuscles": "Full Body Kinetic Chain & Stability",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Ball Sit-up (on stability ball).",
      "02 Movement: Perform controlled execution targeting Full Body Kinetic Chain & Stability.",
      "03 Form lock: Coordinate breathing with movement, maintain core engagement."
    ],
    "keyFormTip": "Coordinate breathing with movement, maintain core engagement.",
    "driveUrl": "https://drive.google.com/file/d/1IGEjCAu0vFu4Ik12zWLy-yLhgnfjcOMX/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1IGEjCAu0vFu4Ik12zWLy-yLhgnfjcOMX/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "mix"
    ]
  },
  {
    "id": "1_HEVDVE3caLHEqNmBP550KPCzIjAVTAA",
    "fileName": "Bent knee Lying  twist (On Stability Ball).mp4",
    "name": "Bent knee Lying  twist (On Stability Ball)",
    "gender": "WOMEN",
    "subfolderCategory": "mix",
    "muscleGroup": "FULL_BODY",
    "targetMuscles": "Full Body Kinetic Chain & Stability",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Bent knee Lying  twist (On Stability Ball).",
      "02 Movement: Perform controlled execution targeting Full Body Kinetic Chain & Stability.",
      "03 Form lock: Coordinate breathing with movement, maintain core engagement."
    ],
    "keyFormTip": "Coordinate breathing with movement, maintain core engagement.",
    "driveUrl": "https://drive.google.com/file/d/1_HEVDVE3caLHEqNmBP550KPCzIjAVTAA/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1_HEVDVE3caLHEqNmBP550KPCzIjAVTAA/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "mix"
    ]
  },
  {
    "id": "11gOnMCxTljQ6aDtlTjq1TcdPvp12yaV3",
    "fileName": "Chest Lift with Rotation.mp4",
    "name": "Chest Lift with Rotation",
    "gender": "WOMEN",
    "subfolderCategory": "mix",
    "muscleGroup": "FULL_BODY",
    "targetMuscles": "Full Body Kinetic Chain & Stability",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Chest Lift with Rotation.",
      "02 Movement: Perform controlled execution targeting Full Body Kinetic Chain & Stability.",
      "03 Form lock: Coordinate breathing with movement, maintain core engagement."
    ],
    "keyFormTip": "Coordinate breathing with movement, maintain core engagement.",
    "driveUrl": "https://drive.google.com/file/d/11gOnMCxTljQ6aDtlTjq1TcdPvp12yaV3/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/11gOnMCxTljQ6aDtlTjq1TcdPvp12yaV3/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "mix"
    ]
  },
  {
    "id": "1IrpubSd8Idm_oM1jftXEuPDqDZo_coaF",
    "fileName": "Corkscrew Pilates.mp4",
    "name": "Corkscrew Pilates",
    "gender": "WOMEN",
    "subfolderCategory": "mix",
    "muscleGroup": "FULL_BODY",
    "targetMuscles": "Full Body Kinetic Chain & Stability",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Corkscrew Pilates.",
      "02 Movement: Perform controlled execution targeting Full Body Kinetic Chain & Stability.",
      "03 Form lock: Coordinate breathing with movement, maintain core engagement."
    ],
    "keyFormTip": "Coordinate breathing with movement, maintain core engagement.",
    "driveUrl": "https://drive.google.com/file/d/1IrpubSd8Idm_oM1jftXEuPDqDZo_coaF/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1IrpubSd8Idm_oM1jftXEuPDqDZo_coaF/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "mix"
    ]
  },
  {
    "id": "1YOsBKF8rhphAxs80hohgo8K7JCBnM8Aa",
    "fileName": "Crunch (leg raise).mp4",
    "name": "Crunch (leg raise)",
    "gender": "WOMEN",
    "subfolderCategory": "mix",
    "muscleGroup": "FULL_BODY",
    "targetMuscles": "Full Body Kinetic Chain & Stability",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Crunch (leg raise).",
      "02 Movement: Perform controlled execution targeting Full Body Kinetic Chain & Stability.",
      "03 Form lock: Coordinate breathing with movement, maintain core engagement."
    ],
    "keyFormTip": "Coordinate breathing with movement, maintain core engagement.",
    "driveUrl": "https://drive.google.com/file/d/1YOsBKF8rhphAxs80hohgo8K7JCBnM8Aa/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1YOsBKF8rhphAxs80hohgo8K7JCBnM8Aa/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "mix"
    ]
  },
  {
    "id": "1BnsgEouE-c499hIawkzWoGPSil6P4b8p",
    "fileName": "Crunch (legs on stability ball).mp4",
    "name": "Crunch (legs on stability ball)",
    "gender": "WOMEN",
    "subfolderCategory": "mix",
    "muscleGroup": "FULL_BODY",
    "targetMuscles": "Full Body Kinetic Chain & Stability",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Crunch (legs on stability ball).",
      "02 Movement: Perform controlled execution targeting Full Body Kinetic Chain & Stability.",
      "03 Form lock: Coordinate breathing with movement, maintain core engagement."
    ],
    "keyFormTip": "Coordinate breathing with movement, maintain core engagement.",
    "driveUrl": "https://drive.google.com/file/d/1BnsgEouE-c499hIawkzWoGPSil6P4b8p/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1BnsgEouE-c499hIawkzWoGPSil6P4b8p/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "mix"
    ]
  },
  {
    "id": "1Mo3_kyWYC7ONSLxfDq6yYrodnEFKVe6x",
    "fileName": "Crunch (straight leg up).mp4",
    "name": "Crunch (straight leg up)",
    "gender": "WOMEN",
    "subfolderCategory": "mix",
    "muscleGroup": "FULL_BODY",
    "targetMuscles": "Full Body Kinetic Chain & Stability",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Crunch (straight leg up).",
      "02 Movement: Perform controlled execution targeting Full Body Kinetic Chain & Stability.",
      "03 Form lock: Coordinate breathing with movement, maintain core engagement."
    ],
    "keyFormTip": "Coordinate breathing with movement, maintain core engagement.",
    "driveUrl": "https://drive.google.com/file/d/1Mo3_kyWYC7ONSLxfDq6yYrodnEFKVe6x/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Mo3_kyWYC7ONSLxfDq6yYrodnEFKVe6x/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "mix"
    ]
  },
  {
    "id": "1EKw_nHrK_KBLNT-DbP1-vgIUYOdncbct",
    "fileName": "Crunch Floor (female).mp4",
    "name": "Crunch Floor (female)",
    "gender": "WOMEN",
    "subfolderCategory": "mix",
    "muscleGroup": "FULL_BODY",
    "targetMuscles": "Full Body Kinetic Chain & Stability",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Crunch Floor (female).",
      "02 Movement: Perform controlled execution targeting Full Body Kinetic Chain & Stability.",
      "03 Form lock: Coordinate breathing with movement, maintain core engagement."
    ],
    "keyFormTip": "Coordinate breathing with movement, maintain core engagement.",
    "driveUrl": "https://drive.google.com/file/d/1EKw_nHrK_KBLNT-DbP1-vgIUYOdncbct/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1EKw_nHrK_KBLNT-DbP1-vgIUYOdncbct/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "mix"
    ]
  },
  {
    "id": "195UWY1m8B7HTL4M50zIrhtOZ2FC6BSqz",
    "fileName": "Front Plank (female).mp4",
    "name": "Front Plank (female)",
    "gender": "WOMEN",
    "subfolderCategory": "mix",
    "muscleGroup": "FULL_BODY",
    "targetMuscles": "Full Body Kinetic Chain & Stability",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Front Plank (female).",
      "02 Movement: Perform controlled execution targeting Full Body Kinetic Chain & Stability.",
      "03 Form lock: Coordinate breathing with movement, maintain core engagement."
    ],
    "keyFormTip": "Coordinate breathing with movement, maintain core engagement.",
    "driveUrl": "https://drive.google.com/file/d/195UWY1m8B7HTL4M50zIrhtOZ2FC6BSqz/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/195UWY1m8B7HTL4M50zIrhtOZ2FC6BSqz/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "mix"
    ]
  },
  {
    "id": "1EudwGQzd1wd4axsnNQVedH_gq5ssnSXz",
    "fileName": "Hip Raise Bridge.mp4",
    "name": "Hip Raise Bridge",
    "gender": "WOMEN",
    "subfolderCategory": "mix",
    "muscleGroup": "FULL_BODY",
    "targetMuscles": "Full Body Kinetic Chain & Stability",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Hip Raise Bridge.",
      "02 Movement: Perform controlled execution targeting Full Body Kinetic Chain & Stability.",
      "03 Form lock: Coordinate breathing with movement, maintain core engagement."
    ],
    "keyFormTip": "Coordinate breathing with movement, maintain core engagement.",
    "driveUrl": "https://drive.google.com/file/d/1EudwGQzd1wd4axsnNQVedH_gq5ssnSXz/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1EudwGQzd1wd4axsnNQVedH_gq5ssnSXz/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "mix"
    ]
  },
  {
    "id": "1ADbyLcQuTNkQ47qQVtUqqd1gMHSqYj8S",
    "fileName": "Hundred Pilates.mp4",
    "name": "Hundred Pilates",
    "gender": "WOMEN",
    "subfolderCategory": "mix",
    "muscleGroup": "FULL_BODY",
    "targetMuscles": "Full Body Kinetic Chain & Stability",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Hundred Pilates.",
      "02 Movement: Perform controlled execution targeting Full Body Kinetic Chain & Stability.",
      "03 Form lock: Coordinate breathing with movement, maintain core engagement."
    ],
    "keyFormTip": "Coordinate breathing with movement, maintain core engagement.",
    "driveUrl": "https://drive.google.com/file/d/1ADbyLcQuTNkQ47qQVtUqqd1gMHSqYj8S/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1ADbyLcQuTNkQ47qQVtUqqd1gMHSqYj8S/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "mix"
    ]
  },
  {
    "id": "1X5Cg0LqxZ7ylug-sM8AhX1HH0APuQgDt",
    "fileName": "Jack knife Floor.mp4",
    "name": "Jack knife Floor",
    "gender": "WOMEN",
    "subfolderCategory": "mix",
    "muscleGroup": "FULL_BODY",
    "targetMuscles": "Full Body Kinetic Chain & Stability",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Jack knife Floor.",
      "02 Movement: Perform controlled execution targeting Full Body Kinetic Chain & Stability.",
      "03 Form lock: Coordinate breathing with movement, maintain core engagement."
    ],
    "keyFormTip": "Coordinate breathing with movement, maintain core engagement.",
    "driveUrl": "https://drive.google.com/file/d/1X5Cg0LqxZ7ylug-sM8AhX1HH0APuQgDt/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1X5Cg0LqxZ7ylug-sM8AhX1HH0APuQgDt/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "mix"
    ]
  },
  {
    "id": "12PrJ9AgwI4YuN4dBPBvWfNsK3cv_3Zww",
    "fileName": "Jack Split Crunches.mp4",
    "name": "Jack Split Crunches",
    "gender": "WOMEN",
    "subfolderCategory": "mix",
    "muscleGroup": "FULL_BODY",
    "targetMuscles": "Full Body Kinetic Chain & Stability",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Jack Split Crunches.",
      "02 Movement: Perform controlled execution targeting Full Body Kinetic Chain & Stability.",
      "03 Form lock: Coordinate breathing with movement, maintain core engagement."
    ],
    "keyFormTip": "Coordinate breathing with movement, maintain core engagement.",
    "driveUrl": "https://drive.google.com/file/d/12PrJ9AgwI4YuN4dBPBvWfNsK3cv_3Zww/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/12PrJ9AgwI4YuN4dBPBvWfNsK3cv_3Zww/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "mix"
    ]
  },
  {
    "id": "1tqveCUstObIaCPcFksBc5aVsPs1GO9x4",
    "fileName": "JackKnife Pilates.mp4",
    "name": "JackKnife Pilates",
    "gender": "WOMEN",
    "subfolderCategory": "mix",
    "muscleGroup": "FULL_BODY",
    "targetMuscles": "Full Body Kinetic Chain & Stability",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for JackKnife Pilates.",
      "02 Movement: Perform controlled execution targeting Full Body Kinetic Chain & Stability.",
      "03 Form lock: Coordinate breathing with movement, maintain core engagement."
    ],
    "keyFormTip": "Coordinate breathing with movement, maintain core engagement.",
    "driveUrl": "https://drive.google.com/file/d/1tqveCUstObIaCPcFksBc5aVsPs1GO9x4/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1tqveCUstObIaCPcFksBc5aVsPs1GO9x4/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "mix"
    ]
  },
  {
    "id": "1SRn8yHqolO_WE_LQM7rjukAPw6Pu9u0a",
    "fileName": "Leg Curl (on stability ball).mp4",
    "name": "Leg Curl (on stability ball)",
    "gender": "WOMEN",
    "subfolderCategory": "mix",
    "muscleGroup": "FULL_BODY",
    "targetMuscles": "Full Body Kinetic Chain & Stability",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Leg Curl (on stability ball).",
      "02 Movement: Perform controlled execution targeting Full Body Kinetic Chain & Stability.",
      "03 Form lock: Coordinate breathing with movement, maintain core engagement."
    ],
    "keyFormTip": "Coordinate breathing with movement, maintain core engagement.",
    "driveUrl": "https://drive.google.com/file/d/1SRn8yHqolO_WE_LQM7rjukAPw6Pu9u0a/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1SRn8yHqolO_WE_LQM7rjukAPw6Pu9u0a/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "mix"
    ]
  },
  {
    "id": "1Xydf9OoGtjM9Nx2FzPu0XiGt7Bk3OPI-",
    "fileName": "Leg Raise Hip Lift.mp4",
    "name": "Leg Raise Hip Lift",
    "gender": "WOMEN",
    "subfolderCategory": "mix",
    "muscleGroup": "FULL_BODY",
    "targetMuscles": "Full Body Kinetic Chain & Stability",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Leg Raise Hip Lift.",
      "02 Movement: Perform controlled execution targeting Full Body Kinetic Chain & Stability.",
      "03 Form lock: Coordinate breathing with movement, maintain core engagement."
    ],
    "keyFormTip": "Coordinate breathing with movement, maintain core engagement.",
    "driveUrl": "https://drive.google.com/file/d/1Xydf9OoGtjM9Nx2FzPu0XiGt7Bk3OPI-/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Xydf9OoGtjM9Nx2FzPu0XiGt7Bk3OPI-/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "mix"
    ]
  },
  {
    "id": "1grLpk0rfgSuxrNS9Si2LMcru5eeeF1Rp",
    "fileName": "Lying Hip Lift (on stability ball).mp4",
    "name": "Lying Hip Lift (on stability ball)",
    "gender": "WOMEN",
    "subfolderCategory": "mix",
    "muscleGroup": "FULL_BODY",
    "targetMuscles": "Full Body Kinetic Chain & Stability",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lying Hip Lift (on stability ball).",
      "02 Movement: Perform controlled execution targeting Full Body Kinetic Chain & Stability.",
      "03 Form lock: Coordinate breathing with movement, maintain core engagement."
    ],
    "keyFormTip": "Coordinate breathing with movement, maintain core engagement.",
    "driveUrl": "https://drive.google.com/file/d/1grLpk0rfgSuxrNS9Si2LMcru5eeeF1Rp/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1grLpk0rfgSuxrNS9Si2LMcru5eeeF1Rp/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "mix"
    ]
  },
  {
    "id": "1GgCB6se1wlsHc4vIf-1cfbs5JSZOvaou",
    "fileName": "Lying Scissor Kick (female).mp4",
    "name": "Lying Scissor Kick (female)",
    "gender": "WOMEN",
    "subfolderCategory": "mix",
    "muscleGroup": "FULL_BODY",
    "targetMuscles": "Full Body Kinetic Chain & Stability",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lying Scissor Kick (female).",
      "02 Movement: Perform controlled execution targeting Full Body Kinetic Chain & Stability.",
      "03 Form lock: Coordinate breathing with movement, maintain core engagement."
    ],
    "keyFormTip": "Coordinate breathing with movement, maintain core engagement.",
    "driveUrl": "https://drive.google.com/file/d/1GgCB6se1wlsHc4vIf-1cfbs5JSZOvaou/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1GgCB6se1wlsHc4vIf-1cfbs5JSZOvaou/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "mix"
    ]
  },
  {
    "id": "1a6o-donk-c8jnrD2Yjz6Pr9kVaxvpNi5",
    "fileName": "Medicine Ball Sit-up (wall).mp4",
    "name": "Medicine Ball Sit-up (wall)",
    "gender": "WOMEN",
    "subfolderCategory": "mix",
    "muscleGroup": "FULL_BODY",
    "targetMuscles": "Full Body Kinetic Chain & Stability",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Medicine Ball Sit-up (wall).",
      "02 Movement: Perform controlled execution targeting Full Body Kinetic Chain & Stability.",
      "03 Form lock: Coordinate breathing with movement, maintain core engagement."
    ],
    "keyFormTip": "Coordinate breathing with movement, maintain core engagement.",
    "driveUrl": "https://drive.google.com/file/d/1a6o-donk-c8jnrD2Yjz6Pr9kVaxvpNi5/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1a6o-donk-c8jnrD2Yjz6Pr9kVaxvpNi5/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "mix"
    ]
  },
  {
    "id": "1wbhXwkpTppLUPhmiSU4AVjk-zjsUNDyR",
    "fileName": "Reverse Crunch (female).mp4",
    "name": "Reverse Crunch (female)",
    "gender": "WOMEN",
    "subfolderCategory": "mix",
    "muscleGroup": "FULL_BODY",
    "targetMuscles": "Full Body Kinetic Chain & Stability",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Reverse Crunch (female).",
      "02 Movement: Perform controlled execution targeting Full Body Kinetic Chain & Stability.",
      "03 Form lock: Coordinate breathing with movement, maintain core engagement."
    ],
    "keyFormTip": "Coordinate breathing with movement, maintain core engagement.",
    "driveUrl": "https://drive.google.com/file/d/1wbhXwkpTppLUPhmiSU4AVjk-zjsUNDyR/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1wbhXwkpTppLUPhmiSU4AVjk-zjsUNDyR/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "mix"
    ]
  },
  {
    "id": "1S3GdtwMXzrcnMYOw84xl4hmtqP9Q9jyk",
    "fileName": "Rotate Push up (female).mp4",
    "name": "Rotate Push up (female)",
    "gender": "WOMEN",
    "subfolderCategory": "mix",
    "muscleGroup": "FULL_BODY",
    "targetMuscles": "Full Body Kinetic Chain & Stability",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Rotate Push up (female).",
      "02 Movement: Perform controlled execution targeting Full Body Kinetic Chain & Stability.",
      "03 Form lock: Coordinate breathing with movement, maintain core engagement."
    ],
    "keyFormTip": "Coordinate breathing with movement, maintain core engagement.",
    "driveUrl": "https://drive.google.com/file/d/1S3GdtwMXzrcnMYOw84xl4hmtqP9Q9jyk/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1S3GdtwMXzrcnMYOw84xl4hmtqP9Q9jyk/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "mix"
    ]
  },
  {
    "id": "1hYHqCaqnG5XH6HPrtY_0XKso4ymCZj2Y",
    "fileName": "Russian Twist (on stability ball arms straight).mp4",
    "name": "Russian Twist (on stability ball arms straight)",
    "gender": "WOMEN",
    "subfolderCategory": "mix",
    "muscleGroup": "FULL_BODY",
    "targetMuscles": "Full Body Kinetic Chain & Stability",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Russian Twist (on stability ball arms straight).",
      "02 Movement: Perform controlled execution targeting Full Body Kinetic Chain & Stability.",
      "03 Form lock: Coordinate breathing with movement, maintain core engagement."
    ],
    "keyFormTip": "Coordinate breathing with movement, maintain core engagement.",
    "driveUrl": "https://drive.google.com/file/d/1hYHqCaqnG5XH6HPrtY_0XKso4ymCZj2Y/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1hYHqCaqnG5XH6HPrtY_0XKso4ymCZj2Y/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "mix"
    ]
  },
  {
    "id": "1CilPKN56uFLLA6RngLG05QiXhqy7qiGg",
    "fileName": "Seated Twist (on stability ball).mp4",
    "name": "Seated Twist (on stability ball)",
    "gender": "WOMEN",
    "subfolderCategory": "mix",
    "muscleGroup": "FULL_BODY",
    "targetMuscles": "Full Body Kinetic Chain & Stability",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Seated Twist (on stability ball).",
      "02 Movement: Perform controlled execution targeting Full Body Kinetic Chain & Stability.",
      "03 Form lock: Coordinate breathing with movement, maintain core engagement."
    ],
    "keyFormTip": "Coordinate breathing with movement, maintain core engagement.",
    "driveUrl": "https://drive.google.com/file/d/1CilPKN56uFLLA6RngLG05QiXhqy7qiGg/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1CilPKN56uFLLA6RngLG05QiXhqy7qiGg/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "mix"
    ]
  },
  {
    "id": "1T9PyKkLUarL-BjkRVTL7YFaVZRXnqIKo",
    "fileName": "Seated Twist (straight arm).mp4",
    "name": "Seated Twist (straight arm)",
    "gender": "WOMEN",
    "subfolderCategory": "mix",
    "muscleGroup": "FULL_BODY",
    "targetMuscles": "Full Body Kinetic Chain & Stability",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Seated Twist (straight arm).",
      "02 Movement: Perform controlled execution targeting Full Body Kinetic Chain & Stability.",
      "03 Form lock: Coordinate breathing with movement, maintain core engagement."
    ],
    "keyFormTip": "Coordinate breathing with movement, maintain core engagement.",
    "driveUrl": "https://drive.google.com/file/d/1T9PyKkLUarL-BjkRVTL7YFaVZRXnqIKo/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1T9PyKkLUarL-BjkRVTL7YFaVZRXnqIKo/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "mix"
    ]
  },
  {
    "id": "1c_2m7Ox6QvI0bsgRFEXvJJlLtUXwvlyE",
    "fileName": "Side Bend (on stability ball).mp4",
    "name": "Side Bend (on stability ball)",
    "gender": "WOMEN",
    "subfolderCategory": "mix",
    "muscleGroup": "FULL_BODY",
    "targetMuscles": "Full Body Kinetic Chain & Stability",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Side Bend (on stability ball).",
      "02 Movement: Perform controlled execution targeting Full Body Kinetic Chain & Stability.",
      "03 Form lock: Coordinate breathing with movement, maintain core engagement."
    ],
    "keyFormTip": "Coordinate breathing with movement, maintain core engagement.",
    "driveUrl": "https://drive.google.com/file/d/1c_2m7Ox6QvI0bsgRFEXvJJlLtUXwvlyE/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1c_2m7Ox6QvI0bsgRFEXvJJlLtUXwvlyE/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "mix"
    ]
  },
  {
    "id": "15Og5H9b6RvE7U84XePur9hzXmp8oESi5",
    "fileName": "Sit Up.mp4",
    "name": "Sit Up",
    "gender": "WOMEN",
    "subfolderCategory": "mix",
    "muscleGroup": "FULL_BODY",
    "targetMuscles": "Full Body Kinetic Chain & Stability",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Sit Up.",
      "02 Movement: Perform controlled execution targeting Full Body Kinetic Chain & Stability.",
      "03 Form lock: Coordinate breathing with movement, maintain core engagement."
    ],
    "keyFormTip": "Coordinate breathing with movement, maintain core engagement.",
    "driveUrl": "https://drive.google.com/file/d/15Og5H9b6RvE7U84XePur9hzXmp8oESi5/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/15Og5H9b6RvE7U84XePur9hzXmp8oESi5/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "mix"
    ]
  },
  {
    "id": "1yVnFka2hUghNdN2jX8CoFFVU2JziPZbd",
    "fileName": "Weighted Leg Extension Crunch.mp4",
    "name": "Weighted Leg Extension Crunch",
    "gender": "WOMEN",
    "subfolderCategory": "mix",
    "muscleGroup": "FULL_BODY",
    "targetMuscles": "Full Body Kinetic Chain & Stability",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Weighted Leg Extension Crunch.",
      "02 Movement: Perform controlled execution targeting Full Body Kinetic Chain & Stability.",
      "03 Form lock: Coordinate breathing with movement, maintain core engagement."
    ],
    "keyFormTip": "Coordinate breathing with movement, maintain core engagement.",
    "driveUrl": "https://drive.google.com/file/d/1yVnFka2hUghNdN2jX8CoFFVU2JziPZbd/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1yVnFka2hUghNdN2jX8CoFFVU2JziPZbd/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "mix"
    ]
  },
  {
    "id": "1TyVvR31g5PSjb3tMX0PYttz7KKVhfVdN",
    "fileName": "Weighted Lying Twist.mp4",
    "name": "Weighted Lying Twist",
    "gender": "WOMEN",
    "subfolderCategory": "mix",
    "muscleGroup": "FULL_BODY",
    "targetMuscles": "Full Body Kinetic Chain & Stability",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Weighted Lying Twist.",
      "02 Movement: Perform controlled execution targeting Full Body Kinetic Chain & Stability.",
      "03 Form lock: Coordinate breathing with movement, maintain core engagement."
    ],
    "keyFormTip": "Coordinate breathing with movement, maintain core engagement.",
    "driveUrl": "https://drive.google.com/file/d/1TyVvR31g5PSjb3tMX0PYttz7KKVhfVdN/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1TyVvR31g5PSjb3tMX0PYttz7KKVhfVdN/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "mix"
    ]
  },
  {
    "id": "1w5fZWwNIx4i81LKx7UdgLopIXcyDFdzA",
    "fileName": "Band Bent-over Rear Lateral Raise.mp4",
    "name": "Band Bent-over Rear Lateral Raise",
    "gender": "WOMEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Bent-over Rear Lateral Raise.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1w5fZWwNIx4i81LKx7UdgLopIXcyDFdzA/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1w5fZWwNIx4i81LKx7UdgLopIXcyDFdzA/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Shoulders"
    ]
  },
  {
    "id": "1uR1sPzeYUkz0B5zQtBxSJe3iOc83ZHU-",
    "fileName": "Band One Arm Forward Raise.mp4",
    "name": "Band One Arm Forward Raise",
    "gender": "WOMEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band One Arm Forward Raise.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1uR1sPzeYUkz0B5zQtBxSJe3iOc83ZHU-/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1uR1sPzeYUkz0B5zQtBxSJe3iOc83ZHU-/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Shoulders"
    ]
  },
  {
    "id": "1TzzYgWSId91ZhZO_zzOAz2kG_X7kwnIs",
    "fileName": "Barbell Front Raise.mp4",
    "name": "Barbell Front Raise",
    "gender": "WOMEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Front Raise.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1TzzYgWSId91ZhZO_zzOAz2kG_X7kwnIs/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1TzzYgWSId91ZhZO_zzOAz2kG_X7kwnIs/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Shoulders"
    ]
  },
  {
    "id": "1mzRKSe-d3BKmwBe3gjkQ349k-K9Sw4PK",
    "fileName": "Barbell Seated Behind Head Military Press.mp4",
    "name": "Barbell Seated Behind Head Military Press",
    "gender": "WOMEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Seated Behind Head Military Press.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1mzRKSe-d3BKmwBe3gjkQ349k-K9Sw4PK/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1mzRKSe-d3BKmwBe3gjkQ349k-K9Sw4PK/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Shoulders"
    ]
  },
  {
    "id": "11yaouaL0NLr5cXyFueZFgo33jlxK5brE",
    "fileName": "Barbell Upright Row (wide-grip).mp4",
    "name": "Barbell Upright Row (wide-grip)",
    "gender": "WOMEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Upright Row (wide-grip).",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/11yaouaL0NLr5cXyFueZFgo33jlxK5brE/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/11yaouaL0NLr5cXyFueZFgo33jlxK5brE/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Shoulders"
    ]
  },
  {
    "id": "14Lg56dgCUEFUZyjIaBpzW8FuP4TX4hWM",
    "fileName": "Cable Crossover Reverse Fly.mp4",
    "name": "Cable Crossover Reverse Fly",
    "gender": "WOMEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Crossover Reverse Fly.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/14Lg56dgCUEFUZyjIaBpzW8FuP4TX4hWM/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/14Lg56dgCUEFUZyjIaBpzW8FuP4TX4hWM/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Shoulders"
    ]
  },
  {
    "id": "1rk_F0hnsTs5b3c1qjGnJZImKJI3EegG9",
    "fileName": "Cable Front Raise.mp4",
    "name": "Cable Front Raise",
    "gender": "WOMEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Front Raise.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1rk_F0hnsTs5b3c1qjGnJZImKJI3EegG9/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1rk_F0hnsTs5b3c1qjGnJZImKJI3EegG9/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Shoulders"
    ]
  },
  {
    "id": "1tLx9j2XCPBZYDgo4G3dwORjBfsoie4CW",
    "fileName": "Cable Lateral Raise.mp4",
    "name": "Cable Lateral Raise",
    "gender": "WOMEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Lateral Raise.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1tLx9j2XCPBZYDgo4G3dwORjBfsoie4CW/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1tLx9j2XCPBZYDgo4G3dwORjBfsoie4CW/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Shoulders"
    ]
  },
  {
    "id": "1tYYccQpnfi1IATAXILIGJKMrlr_Uy_A1",
    "fileName": "Cable One Arm Forward Raise.mp4",
    "name": "Cable One Arm Forward Raise",
    "gender": "WOMEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable One Arm Forward Raise.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1tYYccQpnfi1IATAXILIGJKMrlr_Uy_A1/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1tYYccQpnfi1IATAXILIGJKMrlr_Uy_A1/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Shoulders"
    ]
  },
  {
    "id": "1EgCmSUVqZ12WLQzGMHOQt52c210uRH8E",
    "fileName": "Cable One Arm Lateral Raise.mp4",
    "name": "Cable One Arm Lateral Raise",
    "gender": "WOMEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable One Arm Lateral Raise.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1EgCmSUVqZ12WLQzGMHOQt52c210uRH8E/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1EgCmSUVqZ12WLQzGMHOQt52c210uRH8E/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Shoulders"
    ]
  },
  {
    "id": "1EfRsuFrruGgsqiGaeyA21B4Y_qBc58c3",
    "fileName": "Cable Rear Delt Row (with rope).mp4",
    "name": "Cable Rear Delt Row (with rope)",
    "gender": "WOMEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Rear Delt Row (with rope).",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1EfRsuFrruGgsqiGaeyA21B4Y_qBc58c3/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1EfRsuFrruGgsqiGaeyA21B4Y_qBc58c3/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Shoulders"
    ]
  },
  {
    "id": "1jKRvnciNX2v7r5Ts_fto5tSSQZhN3p-N",
    "fileName": "Dumbbell Alternate Shoulder Press.mp4",
    "name": "Dumbbell Alternate Shoulder Press",
    "gender": "WOMEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Alternate Shoulder Press.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1jKRvnciNX2v7r5Ts_fto5tSSQZhN3p-N/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1jKRvnciNX2v7r5Ts_fto5tSSQZhN3p-N/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Shoulders"
    ]
  },
  {
    "id": "1P1-a3EkAaVJPzNJWIWSNyB22JsMSHcqZ",
    "fileName": "Dumbbell Arnold Press.mp4",
    "name": "Dumbbell Arnold Press",
    "gender": "WOMEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Arnold Press.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1P1-a3EkAaVJPzNJWIWSNyB22JsMSHcqZ/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1P1-a3EkAaVJPzNJWIWSNyB22JsMSHcqZ/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Shoulders"
    ]
  },
  {
    "id": "1JU4jWUdMbojmN18yLjlbqsshqQaVCApM",
    "fileName": "Dumbbell Bench Seated Press.mp4",
    "name": "Dumbbell Bench Seated Press",
    "gender": "WOMEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Bench Seated Press.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1JU4jWUdMbojmN18yLjlbqsshqQaVCApM/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1JU4jWUdMbojmN18yLjlbqsshqQaVCApM/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Shoulders"
    ]
  },
  {
    "id": "1MxRlp-lUccA8JXaUgV41uZBz-9BbSRRl",
    "fileName": "Dumbbell Front Raise.mp4",
    "name": "Dumbbell Front Raise",
    "gender": "WOMEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Front Raise.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1MxRlp-lUccA8JXaUgV41uZBz-9BbSRRl/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1MxRlp-lUccA8JXaUgV41uZBz-9BbSRRl/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Shoulders"
    ]
  },
  {
    "id": "1dKD6HW8Rk4U2DRuS2yob14L5MGYgBwyt",
    "fileName": "Dumbbell Incline Hammer Press.mp4",
    "name": "Dumbbell Incline Hammer Press",
    "gender": "WOMEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Incline Hammer Press.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1dKD6HW8Rk4U2DRuS2yob14L5MGYgBwyt/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1dKD6HW8Rk4U2DRuS2yob14L5MGYgBwyt/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Shoulders"
    ]
  },
  {
    "id": "1YMg76LH62KD3xUj_IOOCiTlGMFXn-wrI",
    "fileName": "Dumbbell Iron Cross.mp4",
    "name": "Dumbbell Iron Cross",
    "gender": "WOMEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Iron Cross.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1YMg76LH62KD3xUj_IOOCiTlGMFXn-wrI/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1YMg76LH62KD3xUj_IOOCiTlGMFXn-wrI/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Shoulders"
    ]
  },
  {
    "id": "1Rf2giBzvGU1MjSBW6bk_x1NrzH5ujyTb",
    "fileName": "Dumbbell Lateral Raise.mp4",
    "name": "Dumbbell Lateral Raise",
    "gender": "WOMEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Lateral Raise.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1Rf2giBzvGU1MjSBW6bk_x1NrzH5ujyTb/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Rf2giBzvGU1MjSBW6bk_x1NrzH5ujyTb/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Shoulders"
    ]
  },
  {
    "id": "1fVZ_T6cm4TYLiF_teQVvDA6dvHExBXC6",
    "fileName": "Dumbbell One Arm Lateral Raise.mp4",
    "name": "Dumbbell One Arm Lateral Raise",
    "gender": "WOMEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell One Arm Lateral Raise.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1fVZ_T6cm4TYLiF_teQVvDA6dvHExBXC6/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1fVZ_T6cm4TYLiF_teQVvDA6dvHExBXC6/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Shoulders"
    ]
  },
  {
    "id": "1Lfs4F0wIsYt5pMRnL8hpIjWKGBTCNWCT",
    "fileName": "Dumbbell Rear Delt Row.mp4",
    "name": "Dumbbell Rear Delt Row",
    "gender": "WOMEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Rear Delt Row.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1Lfs4F0wIsYt5pMRnL8hpIjWKGBTCNWCT/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Lfs4F0wIsYt5pMRnL8hpIjWKGBTCNWCT/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Shoulders"
    ]
  },
  {
    "id": "1iOjqLOpNOzJvfkOZiT01zIEwE77b7aAa",
    "fileName": "Dumbbell Rear Lateral Raise.mp4",
    "name": "Dumbbell Rear Lateral Raise",
    "gender": "WOMEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Rear Lateral Raise.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1iOjqLOpNOzJvfkOZiT01zIEwE77b7aAa/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1iOjqLOpNOzJvfkOZiT01zIEwE77b7aAa/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Shoulders"
    ]
  },
  {
    "id": "1Sb-d0xt_MZ2hX9GYldgmP9PIFV3xbguy",
    "fileName": "Dumbbell Seated Front Raise.mp4",
    "name": "Dumbbell Seated Front Raise",
    "gender": "WOMEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Seated Front Raise.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1Sb-d0xt_MZ2hX9GYldgmP9PIFV3xbguy/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Sb-d0xt_MZ2hX9GYldgmP9PIFV3xbguy/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Shoulders"
    ]
  },
  {
    "id": "1oJ8MAwXK94G8p7dauMFVsNkDDEh_5yej",
    "fileName": "Dumbbell Seated Lateral Raise.mp4",
    "name": "Dumbbell Seated Lateral Raise",
    "gender": "WOMEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Seated Lateral Raise.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1oJ8MAwXK94G8p7dauMFVsNkDDEh_5yej/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1oJ8MAwXK94G8p7dauMFVsNkDDEh_5yej/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Shoulders"
    ]
  },
  {
    "id": "1FVaiGpLgh1prmnZG8Px2Uko1DgPowC8N",
    "fileName": "EZ Barbell Anti Gravity Press.mp4",
    "name": "EZ Barbell Anti Gravity Press",
    "gender": "WOMEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for EZ Barbell Anti Gravity Press.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1FVaiGpLgh1prmnZG8Px2Uko1DgPowC8N/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1FVaiGpLgh1prmnZG8Px2Uko1DgPowC8N/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Shoulders"
    ]
  },
  {
    "id": "1Pcuc5WHk2pHnfZWIWFSXrhUR8ck149jL",
    "fileName": "Lever Lateral Raise.mp4",
    "name": "Lever Lateral Raise",
    "gender": "WOMEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Lateral Raise.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1Pcuc5WHk2pHnfZWIWFSXrhUR8ck149jL/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Pcuc5WHk2pHnfZWIWFSXrhUR8ck149jL/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Shoulders"
    ]
  },
  {
    "id": "1dDxN3HNdF6_kJxuVAl7yrVyqv18x-wUf",
    "fileName": "Lever Military Press.mp4",
    "name": "Lever Military Press",
    "gender": "WOMEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Military Press.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1dDxN3HNdF6_kJxuVAl7yrVyqv18x-wUf/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1dDxN3HNdF6_kJxuVAl7yrVyqv18x-wUf/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Shoulders"
    ]
  },
  {
    "id": "1OnH2mj46_wQZoZAuwuZWxqK2RxqcXGBL",
    "fileName": "Lever Seated Reverse Fly.mp4",
    "name": "Lever Seated Reverse Fly",
    "gender": "WOMEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Seated Reverse Fly.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1OnH2mj46_wQZoZAuwuZWxqK2RxqcXGBL/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1OnH2mj46_wQZoZAuwuZWxqK2RxqcXGBL/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Shoulders"
    ]
  },
  {
    "id": "1GcbirVFDk3hhPuHCq9QyOTxT4BaW1GB5",
    "fileName": "Military Press.mp4",
    "name": "Military Press",
    "gender": "WOMEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Military Press.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1GcbirVFDk3hhPuHCq9QyOTxT4BaW1GB5/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1GcbirVFDk3hhPuHCq9QyOTxT4BaW1GB5/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Shoulders"
    ]
  },
  {
    "id": "1U4w0YnsMBbo0d8Ok4J8-ge3X0APv-iba",
    "fileName": "Smith Seated Shoulder Press.mp4",
    "name": "Smith Seated Shoulder Press",
    "gender": "WOMEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Smith Seated Shoulder Press.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1U4w0YnsMBbo0d8Ok4J8-ge3X0APv-iba/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1U4w0YnsMBbo0d8Ok4J8-ge3X0APv-iba/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Shoulders"
    ]
  },
  {
    "id": "1TR6b2FSRgQ6vUa1qWQEADb6w0HfkDUyS",
    "fileName": "Stretching - Band Warm-up Shoulder Stretch.mp4",
    "name": "Stretching - Band Warm-up Shoulder Stretch",
    "gender": "WOMEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Band Warm-up Shoulder Stretch.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1TR6b2FSRgQ6vUa1qWQEADb6w0HfkDUyS/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1TR6b2FSRgQ6vUa1qWQEADb6w0HfkDUyS/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Shoulders"
    ]
  },
  {
    "id": "1lPU0_YUlYnaGIgdqR4lNryQVJzKlNdhu",
    "fileName": "Stretching - Rear Deltoid Stretch.mp4",
    "name": "Stretching - Rear Deltoid Stretch",
    "gender": "WOMEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Rear Deltoid Stretch.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1lPU0_YUlYnaGIgdqR4lNryQVJzKlNdhu/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1lPU0_YUlYnaGIgdqR4lNryQVJzKlNdhu/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Shoulders"
    ]
  },
  {
    "id": "10TDELCxtuYdNSUwpAWtNRw28m1UKaZnK",
    "fileName": "Stretching - Seated Shoulder Flexor Depresor Retractor.mp4",
    "name": "Stretching - Seated Shoulder Flexor Depresor Retractor",
    "gender": "WOMEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Seated Shoulder Flexor Depresor Retractor.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/10TDELCxtuYdNSUwpAWtNRw28m1UKaZnK/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/10TDELCxtuYdNSUwpAWtNRw28m1UKaZnK/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Shoulders"
    ]
  },
  {
    "id": "1DuOM2xv5FX_FZouio2eCzF5m8MnkHqSp",
    "fileName": "Barbell Rear Delt Raise.mp4",
    "name": "Barbell Rear Delt Raise",
    "gender": "WOMEN",
    "subfolderCategory": "Trapezius",
    "muscleGroup": "BACK",
    "targetMuscles": "Upper, Middle & Lower Trapezius",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "12-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Rear Delt Raise.",
      "02 Movement: Perform controlled execution targeting Upper, Middle & Lower Trapezius.",
      "03 Form lock: Elevate shoulders straight up toward ears, pause at the top."
    ],
    "keyFormTip": "Elevate shoulders straight up toward ears, pause at the top.",
    "driveUrl": "https://drive.google.com/file/d/1DuOM2xv5FX_FZouio2eCzF5m8MnkHqSp/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1DuOM2xv5FX_FZouio2eCzF5m8MnkHqSp/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Trapezius"
    ]
  },
  {
    "id": "1P18tIyRcS5RTBecS63DYiYRFshoHVLaC",
    "fileName": "Barbell Shrug.mp4",
    "name": "Barbell Shrug",
    "gender": "WOMEN",
    "subfolderCategory": "Trapezius",
    "muscleGroup": "BACK",
    "targetMuscles": "Upper, Middle & Lower Trapezius",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "12-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Shrug.",
      "02 Movement: Perform controlled execution targeting Upper, Middle & Lower Trapezius.",
      "03 Form lock: Elevate shoulders straight up toward ears, pause at the top."
    ],
    "keyFormTip": "Elevate shoulders straight up toward ears, pause at the top.",
    "driveUrl": "https://drive.google.com/file/d/1P18tIyRcS5RTBecS63DYiYRFshoHVLaC/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1P18tIyRcS5RTBecS63DYiYRFshoHVLaC/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Trapezius"
    ]
  },
  {
    "id": "1NcS2jlMISyvBEhCVAFnnEtC4QkjdZF7e",
    "fileName": "Dumbbell Incline Shrug.mp4",
    "name": "Dumbbell Incline Shrug",
    "gender": "WOMEN",
    "subfolderCategory": "Trapezius",
    "muscleGroup": "BACK",
    "targetMuscles": "Upper, Middle & Lower Trapezius",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "12-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Incline Shrug.",
      "02 Movement: Perform controlled execution targeting Upper, Middle & Lower Trapezius.",
      "03 Form lock: Elevate shoulders straight up toward ears, pause at the top."
    ],
    "keyFormTip": "Elevate shoulders straight up toward ears, pause at the top.",
    "driveUrl": "https://drive.google.com/file/d/1NcS2jlMISyvBEhCVAFnnEtC4QkjdZF7e/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1NcS2jlMISyvBEhCVAFnnEtC4QkjdZF7e/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Trapezius"
    ]
  },
  {
    "id": "1oeD2ivjdm503kN_nlV-uqmrY4pAE3C8q",
    "fileName": "Dumbbell Shrug.mp4",
    "name": "Dumbbell Shrug",
    "gender": "WOMEN",
    "subfolderCategory": "Trapezius",
    "muscleGroup": "BACK",
    "targetMuscles": "Upper, Middle & Lower Trapezius",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "12-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Shrug.",
      "02 Movement: Perform controlled execution targeting Upper, Middle & Lower Trapezius.",
      "03 Form lock: Elevate shoulders straight up toward ears, pause at the top."
    ],
    "keyFormTip": "Elevate shoulders straight up toward ears, pause at the top.",
    "driveUrl": "https://drive.google.com/file/d/1oeD2ivjdm503kN_nlV-uqmrY4pAE3C8q/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1oeD2ivjdm503kN_nlV-uqmrY4pAE3C8q/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Trapezius"
    ]
  },
  {
    "id": "162Tr6LDke822vNk4ONNHfWZ2yNtfM0sW",
    "fileName": "Lever Shrug.mp4",
    "name": "Lever Shrug",
    "gender": "WOMEN",
    "subfolderCategory": "Trapezius",
    "muscleGroup": "BACK",
    "targetMuscles": "Upper, Middle & Lower Trapezius",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "12-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Shrug.",
      "02 Movement: Perform controlled execution targeting Upper, Middle & Lower Trapezius.",
      "03 Form lock: Elevate shoulders straight up toward ears, pause at the top."
    ],
    "keyFormTip": "Elevate shoulders straight up toward ears, pause at the top.",
    "driveUrl": "https://drive.google.com/file/d/162Tr6LDke822vNk4ONNHfWZ2yNtfM0sW/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/162Tr6LDke822vNk4ONNHfWZ2yNtfM0sW/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Trapezius"
    ]
  },
  {
    "id": "1_sgko-4AS_5ZRdoOJzZYrH36VQVCFP4H",
    "fileName": "Scapula Dips.mp4",
    "name": "Scapula Dips",
    "gender": "WOMEN",
    "subfolderCategory": "Trapezius",
    "muscleGroup": "BACK",
    "targetMuscles": "Upper, Middle & Lower Trapezius",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "12-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Scapula Dips.",
      "02 Movement: Perform controlled execution targeting Upper, Middle & Lower Trapezius.",
      "03 Form lock: Elevate shoulders straight up toward ears, pause at the top."
    ],
    "keyFormTip": "Elevate shoulders straight up toward ears, pause at the top.",
    "driveUrl": "https://drive.google.com/file/d/1_sgko-4AS_5ZRdoOJzZYrH36VQVCFP4H/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1_sgko-4AS_5ZRdoOJzZYrH36VQVCFP4H/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Trapezius"
    ]
  },
  {
    "id": "17eTNBw3KgxJ6N3tLf4ta-ksGlc4uAj42",
    "fileName": "Stretching - Neck Side Stretch.mp4",
    "name": "Stretching - Neck Side Stretch",
    "gender": "WOMEN",
    "subfolderCategory": "Trapezius",
    "muscleGroup": "BACK",
    "targetMuscles": "Upper, Middle & Lower Trapezius",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "12-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Neck Side Stretch.",
      "02 Movement: Perform controlled execution targeting Upper, Middle & Lower Trapezius.",
      "03 Form lock: Elevate shoulders straight up toward ears, pause at the top."
    ],
    "keyFormTip": "Elevate shoulders straight up toward ears, pause at the top.",
    "driveUrl": "https://drive.google.com/file/d/17eTNBw3KgxJ6N3tLf4ta-ksGlc4uAj42/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/17eTNBw3KgxJ6N3tLf4ta-ksGlc4uAj42/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Trapezius"
    ]
  },
  {
    "id": "1eqSuhMHRw-tD2jwJkEnICfgH3dOQShX8",
    "fileName": "Band Overhead Triceps Extension.mp4",
    "name": "Band Overhead Triceps Extension",
    "gender": "WOMEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "HOME_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Overhead Triceps Extension.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1eqSuhMHRw-tD2jwJkEnICfgH3dOQShX8/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1eqSuhMHRw-tD2jwJkEnICfgH3dOQShX8/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Triceps"
    ]
  },
  {
    "id": "1uNI84tcY2PAVFR7ZUnObyGpCxuT5weda",
    "fileName": "Band Side Triceps Pushdown.mp4",
    "name": "Band Side Triceps Pushdown",
    "gender": "WOMEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Side Triceps Pushdown.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1uNI84tcY2PAVFR7ZUnObyGpCxuT5weda/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1uNI84tcY2PAVFR7ZUnObyGpCxuT5weda/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Triceps"
    ]
  },
  {
    "id": "1a8tYjbrpL5eBNXglog9OrGb7heTPOEl_",
    "fileName": "Band Triceps Pushdown.mp4",
    "name": "Band Triceps Pushdown",
    "gender": "WOMEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Triceps Pushdown.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1a8tYjbrpL5eBNXglog9OrGb7heTPOEl_/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1a8tYjbrpL5eBNXglog9OrGb7heTPOEl_/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Triceps"
    ]
  },
  {
    "id": "1Mvz3p2pZ0yZCX5aa7JgqCL5BuPlcPWxY",
    "fileName": "Bench Dips.mp4",
    "name": "Bench Dips",
    "gender": "WOMEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Bench Dips.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1Mvz3p2pZ0yZCX5aa7JgqCL5BuPlcPWxY/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Mvz3p2pZ0yZCX5aa7JgqCL5BuPlcPWxY/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Triceps"
    ]
  },
  {
    "id": "1pN39JM6arG72q9SUUiJwxrlkutu-sYuk",
    "fileName": "Cable Lying Triceps Extension.mp4",
    "name": "Cable Lying Triceps Extension",
    "gender": "WOMEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Lying Triceps Extension.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1pN39JM6arG72q9SUUiJwxrlkutu-sYuk/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1pN39JM6arG72q9SUUiJwxrlkutu-sYuk/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Triceps"
    ]
  },
  {
    "id": "1-7ZJgk1kyeuE6B1brbgjjBa9aG1ce8KM",
    "fileName": "Cable Overhead Triceps Extension (rope attachment).mp4",
    "name": "Cable Overhead Triceps Extension (rope attachment)",
    "gender": "WOMEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Overhead Triceps Extension (rope attachment).",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1-7ZJgk1kyeuE6B1brbgjjBa9aG1ce8KM/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1-7ZJgk1kyeuE6B1brbgjjBa9aG1ce8KM/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Triceps"
    ]
  },
  {
    "id": "1Dd1yOChFvKbr3WSY_1RzycQcMEV5lnLi",
    "fileName": "Cable Pushdown (rope attachment).mp4",
    "name": "Cable Pushdown (rope attachment)",
    "gender": "WOMEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Pushdown (rope attachment).",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1Dd1yOChFvKbr3WSY_1RzycQcMEV5lnLi/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Dd1yOChFvKbr3WSY_1RzycQcMEV5lnLi/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Triceps"
    ]
  },
  {
    "id": "1EIxQs0VLLvL96EmIn3IoLWTL_aU-_c6v",
    "fileName": "Cable Rope High Pulley Overhead Triceps Extension.mp4",
    "name": "Cable Rope High Pulley Overhead Triceps Extension",
    "gender": "WOMEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Rope High Pulley Overhead Triceps Extension.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1EIxQs0VLLvL96EmIn3IoLWTL_aU-_c6v/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1EIxQs0VLLvL96EmIn3IoLWTL_aU-_c6v/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Triceps"
    ]
  },
  {
    "id": "1Y1jSWpjGiWgfoIem1CuwEeHT0kMvHuti",
    "fileName": "Cable Standing One Arm Triceps Extension.mp4",
    "name": "Cable Standing One Arm Triceps Extension",
    "gender": "WOMEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Standing One Arm Triceps Extension.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1Y1jSWpjGiWgfoIem1CuwEeHT0kMvHuti/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Y1jSWpjGiWgfoIem1CuwEeHT0kMvHuti/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Triceps"
    ]
  },
  {
    "id": "1DDZhwbTaMFgyq7KYrDYpSdoxltRpO0Lk",
    "fileName": "Cable Triceps Pushdown.mp4",
    "name": "Cable Triceps Pushdown",
    "gender": "WOMEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Triceps Pushdown.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1DDZhwbTaMFgyq7KYrDYpSdoxltRpO0Lk/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1DDZhwbTaMFgyq7KYrDYpSdoxltRpO0Lk/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Triceps"
    ]
  },
  {
    "id": "1-3l4vF7s7kzAHKmhGys2M7WEiDJsZPvz",
    "fileName": "Close Grip Push-ups.mp4",
    "name": "Close Grip Push-ups",
    "gender": "WOMEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Close Grip Push-ups.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1-3l4vF7s7kzAHKmhGys2M7WEiDJsZPvz/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1-3l4vF7s7kzAHKmhGys2M7WEiDJsZPvz/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Triceps"
    ]
  },
  {
    "id": "14-m9GxE1oznNcMvENX0CVa6N8sYBdKB6",
    "fileName": "Dumbbell Close Grip Press.mp4",
    "name": "Dumbbell Close Grip Press",
    "gender": "WOMEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Close Grip Press.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/14-m9GxE1oznNcMvENX0CVa6N8sYBdKB6/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/14-m9GxE1oznNcMvENX0CVa6N8sYBdKB6/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Triceps"
    ]
  },
  {
    "id": "18GnZvnrYcKbdGxgD-YNmNqOiar9A_Pz3",
    "fileName": "Dumbbell Incline Triceps Extension.mp4",
    "name": "Dumbbell Incline Triceps Extension",
    "gender": "WOMEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Incline Triceps Extension.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/18GnZvnrYcKbdGxgD-YNmNqOiar9A_Pz3/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/18GnZvnrYcKbdGxgD-YNmNqOiar9A_Pz3/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Triceps"
    ]
  },
  {
    "id": "1uBt9YyO0SRZS72pr02wgZaUnnxQ8cAgU",
    "fileName": "Dumbbell Kickback.mp4",
    "name": "Dumbbell Kickback",
    "gender": "WOMEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Kickback.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1uBt9YyO0SRZS72pr02wgZaUnnxQ8cAgU/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1uBt9YyO0SRZS72pr02wgZaUnnxQ8cAgU/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Triceps"
    ]
  },
  {
    "id": "1MlrXa43lFqjqYgV0peNQUD_cJypfks9b",
    "fileName": "Dumbbell Lying Alternate Extension.mp4",
    "name": "Dumbbell Lying Alternate Extension",
    "gender": "WOMEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Lying Alternate Extension.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1MlrXa43lFqjqYgV0peNQUD_cJypfks9b/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1MlrXa43lFqjqYgV0peNQUD_cJypfks9b/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Triceps"
    ]
  },
  {
    "id": "1o3aKOwP8Fz7cUUB8u33KBRvHANJdLaeV",
    "fileName": "Dumbbell Lying Triceps Extension.mp4",
    "name": "Dumbbell Lying Triceps Extension",
    "gender": "WOMEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Lying Triceps Extension.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1o3aKOwP8Fz7cUUB8u33KBRvHANJdLaeV/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1o3aKOwP8Fz7cUUB8u33KBRvHANJdLaeV/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Triceps"
    ]
  },
  {
    "id": "1OYShZ6w0Yo8M12fIimxvecUcmqzBCTdE",
    "fileName": "Dumbbell One Arm Triceps Extension.mp4",
    "name": "Dumbbell One Arm Triceps Extension",
    "gender": "WOMEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell One Arm Triceps Extension.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1OYShZ6w0Yo8M12fIimxvecUcmqzBCTdE/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1OYShZ6w0Yo8M12fIimxvecUcmqzBCTdE/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Triceps"
    ]
  },
  {
    "id": "14YiK_lhBVR-tKaA4uU6aIB8W3YEG88go",
    "fileName": "Dumbbell Pronate-grip Triceps Extension.mp4",
    "name": "Dumbbell Pronate-grip Triceps Extension",
    "gender": "WOMEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Pronate-grip Triceps Extension.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/14YiK_lhBVR-tKaA4uU6aIB8W3YEG88go/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/14YiK_lhBVR-tKaA4uU6aIB8W3YEG88go/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Triceps"
    ]
  },
  {
    "id": "1SK-_PGSrMNVE9NwyCbm_3gW_UC9SSWcV",
    "fileName": "Dumbbell Seated Kickback.mp4",
    "name": "Dumbbell Seated Kickback",
    "gender": "WOMEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Seated Kickback.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1SK-_PGSrMNVE9NwyCbm_3gW_UC9SSWcV/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1SK-_PGSrMNVE9NwyCbm_3gW_UC9SSWcV/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Triceps"
    ]
  },
  {
    "id": "17YdZUr2NlENIgzBmL2spZRMrPF8FD2Cm",
    "fileName": "Dumbbell Seated Triceps Extension.mp4",
    "name": "Dumbbell Seated Triceps Extension",
    "gender": "WOMEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Seated Triceps Extension.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/17YdZUr2NlENIgzBmL2spZRMrPF8FD2Cm/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/17YdZUr2NlENIgzBmL2spZRMrPF8FD2Cm/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Triceps"
    ]
  },
  {
    "id": "1-Q5jTmuHJ1W_Nrdbpwl8FFr_wQBugvix",
    "fileName": "EZ Barbell Lying Triceps Extension.mp4",
    "name": "EZ Barbell Lying Triceps Extension",
    "gender": "WOMEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for EZ Barbell Lying Triceps Extension.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1-Q5jTmuHJ1W_Nrdbpwl8FFr_wQBugvix/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1-Q5jTmuHJ1W_Nrdbpwl8FFr_wQBugvix/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Triceps"
    ]
  },
  {
    "id": "1jMPmkXNMR7AdfbOu-t3QgWsSfjKTI5rZ",
    "fileName": "Lever Seated Dips.mp4",
    "name": "Lever Seated Dips",
    "gender": "WOMEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Seated Dips.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1jMPmkXNMR7AdfbOu-t3QgWsSfjKTI5rZ/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1jMPmkXNMR7AdfbOu-t3QgWsSfjKTI5rZ/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Triceps"
    ]
  },
  {
    "id": "1NP9GXDrIG9Zku7tWgcztyPA_1stCDTZq",
    "fileName": "Lever Triceps Extension (neutral grip).mp4",
    "name": "Lever Triceps Extension (neutral grip)",
    "gender": "WOMEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Triceps Extension (neutral grip).",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1NP9GXDrIG9Zku7tWgcztyPA_1stCDTZq/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1NP9GXDrIG9Zku7tWgcztyPA_1stCDTZq/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Triceps"
    ]
  },
  {
    "id": "1ojFkxo1SneYVoOy47Rs0kzf656buGDMQ",
    "fileName": "Lever Triceps Extension.mp4",
    "name": "Lever Triceps Extension",
    "gender": "WOMEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Triceps Extension.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1ojFkxo1SneYVoOy47Rs0kzf656buGDMQ/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1ojFkxo1SneYVoOy47Rs0kzf656buGDMQ/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Triceps"
    ]
  },
  {
    "id": "1gTG2CihZ-CsyGCd2y6HafGNSdoZH6Q31",
    "fileName": "Old School Reverse Extensions.mp4",
    "name": "Old School Reverse Extensions",
    "gender": "WOMEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Old School Reverse Extensions.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1gTG2CihZ-CsyGCd2y6HafGNSdoZH6Q31/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1gTG2CihZ-CsyGCd2y6HafGNSdoZH6Q31/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Triceps"
    ]
  },
  {
    "id": "1Ou5lkLFUR_LAnm1J_AHFiOC87iwCKjWk",
    "fileName": "Stretching - Kneeling Triceps Extension.mp4",
    "name": "Stretching - Kneeling Triceps Extension",
    "gender": "WOMEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Kneeling Triceps Extension.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1Ou5lkLFUR_LAnm1J_AHFiOC87iwCKjWk/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Ou5lkLFUR_LAnm1J_AHFiOC87iwCKjWk/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Triceps"
    ]
  },
  {
    "id": "1MBnYheVJxw4olsjPIgjrJlgeysi_7jp2",
    "fileName": "Stretching - Reverse Dip.mp4",
    "name": "Stretching - Reverse Dip",
    "gender": "WOMEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Reverse Dip.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1MBnYheVJxw4olsjPIgjrJlgeysi_7jp2/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1MBnYheVJxw4olsjPIgjrJlgeysi_7jp2/preview",
    "path": [
      "exercise (whitout watermark)",
      "girl",
      "Triceps"
    ]
  },
  {
    "id": "1tXuaFs_6H02JXvVgae5hpfgrbhTBnwnD",
    "fileName": "45 Degree Bycicle Twisting Crunch (1).mp4",
    "name": "45 Degree Bycicle Twisting Crunch (1)",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for 45 Degree Bycicle Twisting Crunch (1).",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1tXuaFs_6H02JXvVgae5hpfgrbhTBnwnD/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1tXuaFs_6H02JXvVgae5hpfgrbhTBnwnD/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "1jwjcfCXi67Rmc2sulD87D3fTHUqDt-TF",
    "fileName": "45 Degree Bycicle Twisting Crunch.mp4",
    "name": "45 Degree Bycicle Twisting Crunch",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for 45 Degree Bycicle Twisting Crunch.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1jwjcfCXi67Rmc2sulD87D3fTHUqDt-TF/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1jwjcfCXi67Rmc2sulD87D3fTHUqDt-TF/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "1fEV_rW4G87u4NCobzgdHY6hNMH1eXQCL",
    "fileName": "45 Degree Side Bend.mp4",
    "name": "45 Degree Side Bend",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for 45 Degree Side Bend.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1fEV_rW4G87u4NCobzgdHY6hNMH1eXQCL/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1fEV_rW4G87u4NCobzgdHY6hNMH1eXQCL/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "1XyEp6uImWbAzsUXxOYizp6uYXZ9bT1pw",
    "fileName": "Air Twisting Crunch.mp4",
    "name": "Air Twisting Crunch",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Air Twisting Crunch.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1XyEp6uImWbAzsUXxOYizp6uYXZ9bT1pw/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1XyEp6uImWbAzsUXxOYizp6uYXZ9bT1pw/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "1Dx2dm3vTyIb46v10VSV6mQ_mthJ2MsHJ",
    "fileName": "Band Decline Sit-ups.mp4",
    "name": "Band Decline Sit-ups",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "HOME_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Decline Sit-ups.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1Dx2dm3vTyIb46v10VSV6mQ_mthJ2MsHJ/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Dx2dm3vTyIb46v10VSV6mQ_mthJ2MsHJ/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "12GaoWrve2Wgy7Z5VeojYQl16a9Ua1lBe",
    "fileName": "Band Side Bend.mp4",
    "name": "Band Side Bend",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Side Bend.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/12GaoWrve2Wgy7Z5VeojYQl16a9Ua1lBe/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/12GaoWrve2Wgy7Z5VeojYQl16a9Ua1lBe/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "170UDY7gpRlx1yOArfG0ON-5A-o1ROmtv",
    "fileName": "Band Standing Crunch.mp4",
    "name": "Band Standing Crunch",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Standing Crunch.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/170UDY7gpRlx1yOArfG0ON-5A-o1ROmtv/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/170UDY7gpRlx1yOArfG0ON-5A-o1ROmtv/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "1vfIu4gAjYhIBpIqxwZ4xNWMQFtTk45t3",
    "fileName": "Band Standing Lift.mp4",
    "name": "Band Standing Lift",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Standing Lift.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1vfIu4gAjYhIBpIqxwZ4xNWMQFtTk45t3/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1vfIu4gAjYhIBpIqxwZ4xNWMQFtTk45t3/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "1Ji7Yy_BgboCKxawS8tdnjeRZjersf4zZ",
    "fileName": "Band Twist (Up-down).mp4",
    "name": "Band Twist (Up-down)",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Twist (Up-down).",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1Ji7Yy_BgboCKxawS8tdnjeRZjersf4zZ/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Ji7Yy_BgboCKxawS8tdnjeRZjersf4zZ/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "1RWeZa6jMFceimx-A6dMB0mjlBPViqPLK",
    "fileName": "Band Twist.mp4",
    "name": "Band Twist",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Twist.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1RWeZa6jMFceimx-A6dMB0mjlBPViqPLK/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1RWeZa6jMFceimx-A6dMB0mjlBPViqPLK/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "1BMjy1ukQVldqcsSCvNvTeZjG5WCLWXjK",
    "fileName": "Bench Leg Raise.mp4",
    "name": "Bench Leg Raise",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Bench Leg Raise.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1BMjy1ukQVldqcsSCvNvTeZjG5WCLWXjK/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1BMjy1ukQVldqcsSCvNvTeZjG5WCLWXjK/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "16ckmG_7JFkVxAqh07N5J3cXVQtUerHRY",
    "fileName": "Bent Knee Lying Twist.mp4",
    "name": "Bent Knee Lying Twist",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Bent Knee Lying Twist.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/16ckmG_7JFkVxAqh07N5J3cXVQtUerHRY/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/16ckmG_7JFkVxAqh07N5J3cXVQtUerHRY/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "1o6i-yaqwq-5CspUivoybkAEZHwzCa174",
    "fileName": "Cable Kneeling Crunch.mp4",
    "name": "Cable Kneeling Crunch",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Kneeling Crunch.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1o6i-yaqwq-5CspUivoybkAEZHwzCa174/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1o6i-yaqwq-5CspUivoybkAEZHwzCa174/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "1PqYF7dvF5lrODC9EedBZoLrm8fpdZ_fo",
    "fileName": "Cable Standing Crunch.mp4",
    "name": "Cable Standing Crunch",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Standing Crunch.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1PqYF7dvF5lrODC9EedBZoLrm8fpdZ_fo/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1PqYF7dvF5lrODC9EedBZoLrm8fpdZ_fo/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "1o4whRzhIgJxSeuIt-Bl7vJ4c3f8xpTRT",
    "fileName": "Cable Standing Lift.mp4",
    "name": "Cable Standing Lift",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Standing Lift.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1o4whRzhIgJxSeuIt-Bl7vJ4c3f8xpTRT/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1o4whRzhIgJxSeuIt-Bl7vJ4c3f8xpTRT/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "15kGCueTuheAbIGxH8qxCNKhf6t5rrnHT",
    "fileName": "Cable Twist (up-down).mp4",
    "name": "Cable Twist (up-down)",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Twist (up-down).",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/15kGCueTuheAbIGxH8qxCNKhf6t5rrnHT/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/15kGCueTuheAbIGxH8qxCNKhf6t5rrnHT/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "1l7rIR7KWGWCnH9TLKd3HTwLSNZdW1t3r",
    "fileName": "Crunch (on bench).mp4",
    "name": "Crunch (on bench)",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Crunch (on bench).",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1l7rIR7KWGWCnH9TLKd3HTwLSNZdW1t3r/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1l7rIR7KWGWCnH9TLKd3HTwLSNZdW1t3r/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "1Kc5uq6Baf_iai1JykUVj2ZbCHoMppASl",
    "fileName": "Dumbbell Side Bend.mp4",
    "name": "Dumbbell Side Bend",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Side Bend.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1Kc5uq6Baf_iai1JykUVj2ZbCHoMppASl/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Kc5uq6Baf_iai1JykUVj2ZbCHoMppASl/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "1MNHEKcddH17qyGfYKh9FfFEeEWZrsntr",
    "fileName": "Hanging Leg Hip Raise.mp4",
    "name": "Hanging Leg Hip Raise",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Hanging Leg Hip Raise.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1MNHEKcddH17qyGfYKh9FfFEeEWZrsntr/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1MNHEKcddH17qyGfYKh9FfFEeEWZrsntr/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "1Zu47W1Gd1TU24ZAc41WADbgLM-0H_KXa",
    "fileName": "Hanging Straight Leg Raise.mp4",
    "name": "Hanging Straight Leg Raise",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Hanging Straight Leg Raise.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1Zu47W1Gd1TU24ZAc41WADbgLM-0H_KXa/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Zu47W1Gd1TU24ZAc41WADbgLM-0H_KXa/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "12W3iEvgaaZ_T6o89gvmb-e2qU-40BWSi",
    "fileName": "Incline Leg Hip Raise.mp4",
    "name": "Incline Leg Hip Raise",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Incline Leg Hip Raise.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/12W3iEvgaaZ_T6o89gvmb-e2qU-40BWSi/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/12W3iEvgaaZ_T6o89gvmb-e2qU-40BWSi/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "1wYolCwE93irabVkhhKi1xyOnytrOT1vW",
    "fileName": "Landmine 180.mp4",
    "name": "Landmine 180",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Landmine 180.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1wYolCwE93irabVkhhKi1xyOnytrOT1vW/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1wYolCwE93irabVkhhKi1xyOnytrOT1vW/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "1Cw8_UDnk59E3XdvXyXUjym_RtBaO4ab-",
    "fileName": "Lever Seated Crunch (1).mp4",
    "name": "Lever Seated Crunch (1)",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Seated Crunch (1).",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1Cw8_UDnk59E3XdvXyXUjym_RtBaO4ab-/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Cw8_UDnk59E3XdvXyXUjym_RtBaO4ab-/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "1u9BwXImTH99Zwtp3jz1NzMwbYhC2WSvk",
    "fileName": "Lever Seated Crunch.mp4",
    "name": "Lever Seated Crunch",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Seated Crunch.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1u9BwXImTH99Zwtp3jz1NzMwbYhC2WSvk/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1u9BwXImTH99Zwtp3jz1NzMwbYhC2WSvk/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "1AjRl0XSEieIGT3Qf5HXkTVwIgsVzWHw9",
    "fileName": "Lever Seated Leg Raise Crunch.mp4",
    "name": "Lever Seated Leg Raise Crunch",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Seated Leg Raise Crunch.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1AjRl0XSEieIGT3Qf5HXkTVwIgsVzWHw9/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1AjRl0XSEieIGT3Qf5HXkTVwIgsVzWHw9/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "1cyP14P1fFy1oOnglUV_WengBIU7DLacM",
    "fileName": "Lying Floor Leg Raise.mp4",
    "name": "Lying Floor Leg Raise",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lying Floor Leg Raise.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1cyP14P1fFy1oOnglUV_WengBIU7DLacM/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1cyP14P1fFy1oOnglUV_WengBIU7DLacM/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "1dfWTfti1UoLtB3cDMqX8T8moORmCWW8N",
    "fileName": "Lying Straight Leg Raise.mp4",
    "name": "Lying Straight Leg Raise",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lying Straight Leg Raise.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1dfWTfti1UoLtB3cDMqX8T8moORmCWW8N/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1dfWTfti1UoLtB3cDMqX8T8moORmCWW8N/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "1IMIzv5mHMfLXmfe55ssR3S_4ee4MJ6g4",
    "fileName": "Otis-ups.mp4",
    "name": "Otis-ups",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Otis-ups.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1IMIzv5mHMfLXmfe55ssR3S_4ee4MJ6g4/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1IMIzv5mHMfLXmfe55ssR3S_4ee4MJ6g4/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "1mgXSud6gRUMRUFTlXI2D7X_RthMN_Ukq",
    "fileName": "Side Bridge - Side Plank.mp4",
    "name": "Side Bridge - Side Plank",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Side Bridge - Side Plank.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1mgXSud6gRUMRUFTlXI2D7X_RthMN_Ukq/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1mgXSud6gRUMRUFTlXI2D7X_RthMN_Ukq/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "1xmnUSrBLv4VyqgGHZo1y9RHr7g_UJhVM",
    "fileName": "Sit-up On Exercise Ball.mp4",
    "name": "Sit-up On Exercise Ball",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Sit-up On Exercise Ball.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1xmnUSrBLv4VyqgGHZo1y9RHr7g_UJhVM/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1xmnUSrBLv4VyqgGHZo1y9RHr7g_UJhVM/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "1I-lYw3oTppo6YgSLeN_u93ZzqnCQJseR",
    "fileName": "Sit-ups.mp4",
    "name": "Sit-ups",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Sit-ups.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1I-lYw3oTppo6YgSLeN_u93ZzqnCQJseR/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1I-lYw3oTppo6YgSLeN_u93ZzqnCQJseR/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "1K0-rPf9Hf8kFrTILLliyH_m7H3RZHdHS",
    "fileName": "Spell Caster.mp4",
    "name": "Spell Caster",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Spell Caster.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1K0-rPf9Hf8kFrTILLliyH_m7H3RZHdHS/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1K0-rPf9Hf8kFrTILLliyH_m7H3RZHdHS/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "1LY2Sd-7o7B7RL5XjRTGZsnqhpHCr-5ih",
    "fileName": "Stretching - Chin-to-chest Stretch.mp4",
    "name": "Stretching - Chin-to-chest Stretch",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Chin-to-chest Stretch.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1LY2Sd-7o7B7RL5XjRTGZsnqhpHCr-5ih/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1LY2Sd-7o7B7RL5XjRTGZsnqhpHCr-5ih/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "1O0dhyS7tv2tLDFLfN6k4z-GShcT_5Q0v",
    "fileName": "Stretching - Iron Cross Stretch.mp4",
    "name": "Stretching - Iron Cross Stretch",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Iron Cross Stretch.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1O0dhyS7tv2tLDFLfN6k4z-GShcT_5Q0v/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1O0dhyS7tv2tLDFLfN6k4z-GShcT_5Q0v/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "1or5pW6m7d-DjcJn959EChp99psO_VYXS",
    "fileName": "Stretching - Seated Twist (straight arm).mp4",
    "name": "Stretching - Seated Twist (straight arm)",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Seated Twist (straight arm).",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1or5pW6m7d-DjcJn959EChp99psO_VYXS/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1or5pW6m7d-DjcJn959EChp99psO_VYXS/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "11VqCi4nVcwEXKAiOsWqEeG6TtpHAmu56",
    "fileName": "Stretching - Spinal Stretch On Exercise Ball.mp4",
    "name": "Stretching - Spinal Stretch On Exercise Ball",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Spinal Stretch On Exercise Ball.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/11VqCi4nVcwEXKAiOsWqEeG6TtpHAmu56/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/11VqCi4nVcwEXKAiOsWqEeG6TtpHAmu56/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "1E4dq8jxRgWIB1zVCl-0KOrdMWppQny29",
    "fileName": "Stretching - Standing Side Bend (bent arm).mp4",
    "name": "Stretching - Standing Side Bend (bent arm)",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Standing Side Bend (bent arm).",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1E4dq8jxRgWIB1zVCl-0KOrdMWppQny29/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1E4dq8jxRgWIB1zVCl-0KOrdMWppQny29/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "1nJ6xZcVXSpeyH4d2V-tPEljgi5zQjm6K",
    "fileName": "Twisting Crunch.mp4",
    "name": "Twisting Crunch",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Twisting Crunch.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1nJ6xZcVXSpeyH4d2V-tPEljgi5zQjm6K/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1nJ6xZcVXSpeyH4d2V-tPEljgi5zQjm6K/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "14xdEg_9oYn9MJD3GAN6go77EqlaK8c9C",
    "fileName": "V-up.mp4",
    "name": "V-up",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for V-up.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/14xdEg_9oYn9MJD3GAN6go77EqlaK8c9C/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/14xdEg_9oYn9MJD3GAN6go77EqlaK8c9C/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "1LFURno0BrhjNohQCp9Ft40Tp_L1tN-7g",
    "fileName": "Vertical Leg Raise (on parallel bars).mp4",
    "name": "Vertical Leg Raise (on parallel bars)",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Vertical Leg Raise (on parallel bars).",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1LFURno0BrhjNohQCp9Ft40Tp_L1tN-7g/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1LFURno0BrhjNohQCp9Ft40Tp_L1tN-7g/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "1JtRNYOn-Xhe9_OJH3dBg2x0SGy_lGXdi",
    "fileName": "Weighted Leg Extension Crunch.mp4",
    "name": "Weighted Leg Extension Crunch",
    "gender": "MEN",
    "subfolderCategory": "abs",
    "muscleGroup": "CORE",
    "targetMuscles": "Rectus Abdominis, Obliques & Deep Core",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Weighted Leg Extension Crunch.",
      "02 Movement: Perform controlled execution targeting Rectus Abdominis, Obliques & Deep Core.",
      "03 Form lock: Brace abdomen, avoid pulling on neck, control contraction."
    ],
    "keyFormTip": "Brace abdomen, avoid pulling on neck, control contraction.",
    "driveUrl": "https://drive.google.com/file/d/1JtRNYOn-Xhe9_OJH3dBg2x0SGy_lGXdi/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1JtRNYOn-Xhe9_OJH3dBg2x0SGy_lGXdi/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "abs"
    ]
  },
  {
    "id": "1m9EsXbDHoDUUJPLPZqBKN5UNqM3FNevP",
    "fileName": "45 Degree Hyperextension.mp4",
    "name": "45 Degree Hyperextension",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for 45 Degree Hyperextension.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1m9EsXbDHoDUUJPLPZqBKN5UNqM3FNevP/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1m9EsXbDHoDUUJPLPZqBKN5UNqM3FNevP/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1XR5B-DINIlB5_b2E2urumGuBTJ_tqOF9",
    "fileName": "Band Assisted Pull-up.mp4",
    "name": "Band Assisted Pull-up",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Assisted Pull-up.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1XR5B-DINIlB5_b2E2urumGuBTJ_tqOF9/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1XR5B-DINIlB5_b2E2urumGuBTJ_tqOF9/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1LomYACkWxf4MuYaqX_sISNSqbcHO9JwZ",
    "fileName": "Band Bent-over Row.mp4",
    "name": "Band Bent-over Row",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Bent-over Row.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1LomYACkWxf4MuYaqX_sISNSqbcHO9JwZ/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1LomYACkWxf4MuYaqX_sISNSqbcHO9JwZ/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1OKYBeM0MjmUwImZag2e6-Bdcn7qqIe5N",
    "fileName": "Band Kneeling One Arm Pulldown.mp4",
    "name": "Band Kneeling One Arm Pulldown",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Kneeling One Arm Pulldown.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1OKYBeM0MjmUwImZag2e6-Bdcn7qqIe5N/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1OKYBeM0MjmUwImZag2e6-Bdcn7qqIe5N/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1GH6DOjGiTVgkBvJGl0T4NTbHMrT6RWAq",
    "fileName": "Band One Arm Twisting Seated Row.mp4",
    "name": "Band One Arm Twisting Seated Row",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band One Arm Twisting Seated Row.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1GH6DOjGiTVgkBvJGl0T4NTbHMrT6RWAq/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1GH6DOjGiTVgkBvJGl0T4NTbHMrT6RWAq/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1Werj3GSI8bglt6CCmDXqoWyD5__-MjsB",
    "fileName": "Band One Leg Kickback Bent Position.mp4",
    "name": "Band One Leg Kickback Bent Position",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band One Leg Kickback Bent Position.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1Werj3GSI8bglt6CCmDXqoWyD5__-MjsB/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Werj3GSI8bglt6CCmDXqoWyD5__-MjsB/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1tQAqAFovmvVfxiXnOYvWxHvJo0Qzlv_F",
    "fileName": "Band Pull Through.mp4",
    "name": "Band Pull Through",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Pull Through.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1tQAqAFovmvVfxiXnOYvWxHvJo0Qzlv_F/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1tQAqAFovmvVfxiXnOYvWxHvJo0Qzlv_F/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1EFQRDJ4sh7jRufjld_q7hukfP_LAl33b",
    "fileName": "Band Seated Row.mp4",
    "name": "Band Seated Row",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Seated Row.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1EFQRDJ4sh7jRufjld_q7hukfP_LAl33b/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1EFQRDJ4sh7jRufjld_q7hukfP_LAl33b/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1ONeh3HDf6755-E4O_fRjef_2azttzdc3",
    "fileName": "Band Straight Back Seated Row.mp4",
    "name": "Band Straight Back Seated Row",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Straight Back Seated Row.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1ONeh3HDf6755-E4O_fRjef_2azttzdc3/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1ONeh3HDf6755-E4O_fRjef_2azttzdc3/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1pigPX77rRnGNYo-876XAaRBsh_iTdhjZ",
    "fileName": "Barbell Bent-over Row Overgrip.mp4",
    "name": "Barbell Bent-over Row Overgrip",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Bent-over Row Overgrip.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1pigPX77rRnGNYo-876XAaRBsh_iTdhjZ/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1pigPX77rRnGNYo-876XAaRBsh_iTdhjZ/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1KJlzE3vFACe7XvzTupeGDG6wF0sVJSpo",
    "fileName": "Barbell Straight Leg Deadlift.mp4",
    "name": "Barbell Straight Leg Deadlift",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Straight Leg Deadlift.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1KJlzE3vFACe7XvzTupeGDG6wF0sVJSpo/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1KJlzE3vFACe7XvzTupeGDG6wF0sVJSpo/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1KDZj3PJp_i9qBaJeF2VynG_mw3yMqfIW",
    "fileName": "Barbell Underhand Bent-over Row.mp4",
    "name": "Barbell Underhand Bent-over Row",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Underhand Bent-over Row.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1KDZj3PJp_i9qBaJeF2VynG_mw3yMqfIW/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1KDZj3PJp_i9qBaJeF2VynG_mw3yMqfIW/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1Nlu4kU1hACzLtbYuDNj6jiO9xcS_1bGF",
    "fileName": "Bench Pull-ups.mp4",
    "name": "Bench Pull-ups",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Bench Pull-ups.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1Nlu4kU1hACzLtbYuDNj6jiO9xcS_1bGF/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Nlu4kU1hACzLtbYuDNj6jiO9xcS_1bGF/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1heDDf3K8QxzzP7A1XH-p9tJuh0IZGCTO",
    "fileName": "Cable Bar Lateral Pulldown (reverse-grip).mp4",
    "name": "Cable Bar Lateral Pulldown (reverse-grip)",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Bar Lateral Pulldown (reverse-grip).",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1heDDf3K8QxzzP7A1XH-p9tJuh0IZGCTO/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1heDDf3K8QxzzP7A1XH-p9tJuh0IZGCTO/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1CcMfcCjWMx7eY8GDxiMCAfUyT4SIXQWh",
    "fileName": "Cable Bar Lateral Pulldown (wide shoulder grip).mp4",
    "name": "Cable Bar Lateral Pulldown (wide shoulder grip)",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Bar Lateral Pulldown (wide shoulder grip).",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1CcMfcCjWMx7eY8GDxiMCAfUyT4SIXQWh/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1CcMfcCjWMx7eY8GDxiMCAfUyT4SIXQWh/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1hM8nCw7Eqwna5xXy3SlU2iEqGa-HCZ9u",
    "fileName": "Cable Close Grip Front Lat Pulldown.mp4",
    "name": "Cable Close Grip Front Lat Pulldown",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Close Grip Front Lat Pulldown.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1hM8nCw7Eqwna5xXy3SlU2iEqGa-HCZ9u/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1hM8nCw7Eqwna5xXy3SlU2iEqGa-HCZ9u/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1muWUtO6_l_EKPbnXLp-Bnv-AXieTCIV-",
    "fileName": "Cable One Arm Lateral Pulldown.mp4",
    "name": "Cable One Arm Lateral Pulldown",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable One Arm Lateral Pulldown.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1muWUtO6_l_EKPbnXLp-Bnv-AXieTCIV-/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1muWUtO6_l_EKPbnXLp-Bnv-AXieTCIV-/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1LygPiP-ThWfLtb2JA016J79AQKqy67KN",
    "fileName": "Cable One Arm Twisting Seated Row.mp4",
    "name": "Cable One Arm Twisting Seated Row",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable One Arm Twisting Seated Row.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1LygPiP-ThWfLtb2JA016J79AQKqy67KN/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1LygPiP-ThWfLtb2JA016J79AQKqy67KN/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1hPBuwogATj6IULJRZ8q_vxIgJo9csKRm",
    "fileName": "Cable Pulldown.mp4",
    "name": "Cable Pulldown",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Pulldown.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1hPBuwogATj6IULJRZ8q_vxIgJo9csKRm/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1hPBuwogATj6IULJRZ8q_vxIgJo9csKRm/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1MntDABdAcyvBT80qdl6_6ZqObE9iv3Ge",
    "fileName": "Cable Seated High Row (V-bar).mp4",
    "name": "Cable Seated High Row (V-bar)",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Seated High Row (V-bar).",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1MntDABdAcyvBT80qdl6_6ZqObE9iv3Ge/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1MntDABdAcyvBT80qdl6_6ZqObE9iv3Ge/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1hU0JoAjZF_X_yI_y_Kmut5LHy6s4Xx7N",
    "fileName": "Cable Seated Row (normal grip).mp4",
    "name": "Cable Seated Row (normal grip)",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Seated Row (normal grip).",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1hU0JoAjZF_X_yI_y_Kmut5LHy6s4Xx7N/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1hU0JoAjZF_X_yI_y_Kmut5LHy6s4Xx7N/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1lOcbEesJLw2_VREySqucHVcdW4pbX88X",
    "fileName": "Cable Seated Row (parallel grip).mp4",
    "name": "Cable Seated Row (parallel grip)",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Seated Row (parallel grip).",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1lOcbEesJLw2_VREySqucHVcdW4pbX88X/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1lOcbEesJLw2_VREySqucHVcdW4pbX88X/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1sqnTE0G6N62dKsrshR8fr74_GWGEbxz-",
    "fileName": "Cable Seated Row (wide-grip).mp4",
    "name": "Cable Seated Row (wide-grip)",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Seated Row (wide-grip).",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1sqnTE0G6N62dKsrshR8fr74_GWGEbxz-/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1sqnTE0G6N62dKsrshR8fr74_GWGEbxz-/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "16MIMmLh5K0c_leF7LDt6nGxBQPJtHnl8",
    "fileName": "Cable Straight Arm Pulldown.mp4",
    "name": "Cable Straight Arm Pulldown",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Straight Arm Pulldown.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/16MIMmLh5K0c_leF7LDt6nGxBQPJtHnl8/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/16MIMmLh5K0c_leF7LDt6nGxBQPJtHnl8/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1YbOKp_B8ullxJO1msfMZT6fp_GnBVK4P",
    "fileName": "Cable Straight Back Seated High Row (reverse-grip).mp4",
    "name": "Cable Straight Back Seated High Row (reverse-grip)",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Straight Back Seated High Row (reverse-grip).",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1YbOKp_B8ullxJO1msfMZT6fp_GnBVK4P/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1YbOKp_B8ullxJO1msfMZT6fp_GnBVK4P/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1hlzvIFIhqTWQA8SXj3-YmiA98InD28eU",
    "fileName": "Cable Straight Back Seated Row (V-grip).mp4",
    "name": "Cable Straight Back Seated Row (V-grip)",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Straight Back Seated Row (V-grip).",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1hlzvIFIhqTWQA8SXj3-YmiA98InD28eU/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1hlzvIFIhqTWQA8SXj3-YmiA98InD28eU/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1dQl9jdRGbTWk8Yy42ES-VUZyo5UQmrrI",
    "fileName": "Cambered Bar Lying Row.mp4",
    "name": "Cambered Bar Lying Row",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cambered Bar Lying Row.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1dQl9jdRGbTWk8Yy42ES-VUZyo5UQmrrI/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1dQl9jdRGbTWk8Yy42ES-VUZyo5UQmrrI/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1BJ9uosHsraB8B1aUkTxddtr8Swvj_GbB",
    "fileName": "Chin-ups  Pull-Ups.mp4",
    "name": "Chin-ups  Pull-Ups",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Chin-ups  Pull-Ups.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1BJ9uosHsraB8B1aUkTxddtr8Swvj_GbB/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1BJ9uosHsraB8B1aUkTxddtr8Swvj_GbB/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1jSEEAVTMueeY78B_DNFEZD0FIU_PtE2s",
    "fileName": "Chin-ups (narrow parallel grip).mp4",
    "name": "Chin-ups (narrow parallel grip)",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Chin-ups (narrow parallel grip).",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1jSEEAVTMueeY78B_DNFEZD0FIU_PtE2s/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1jSEEAVTMueeY78B_DNFEZD0FIU_PtE2s/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1T6cEHVDlDhiBF8IE5nJ2lp0EywB0NXet",
    "fileName": "Close Grip Chin-up.mp4",
    "name": "Close Grip Chin-up",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Close Grip Chin-up.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1T6cEHVDlDhiBF8IE5nJ2lp0EywB0NXet/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1T6cEHVDlDhiBF8IE5nJ2lp0EywB0NXet/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1uEFyCxti0lL6ype4amVdeLex4WF7twGk",
    "fileName": "Commando Pull-up.mp4",
    "name": "Commando Pull-up",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Commando Pull-up.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1uEFyCxti0lL6ype4amVdeLex4WF7twGk/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1uEFyCxti0lL6ype4amVdeLex4WF7twGk/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "10EgPKWEaseZfj6lkyabSj8vt5DrY_6N1",
    "fileName": "Dumbbell Bent-over Row.mp4",
    "name": "Dumbbell Bent-over Row",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Bent-over Row.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/10EgPKWEaseZfj6lkyabSj8vt5DrY_6N1/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/10EgPKWEaseZfj6lkyabSj8vt5DrY_6N1/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1s_wtJywcHPQjVy7dGA3HDIr2lkSZi3jP",
    "fileName": "Dumbbell Deadlift.mp4",
    "name": "Dumbbell Deadlift",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Deadlift.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1s_wtJywcHPQjVy7dGA3HDIr2lkSZi3jP/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1s_wtJywcHPQjVy7dGA3HDIr2lkSZi3jP/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1VouVEJd6gc-SxdPV3zKWUP7fNyIPH64G",
    "fileName": "Dumbbell Hammer Grip Incline Bench Row.mp4",
    "name": "Dumbbell Hammer Grip Incline Bench Row",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Hammer Grip Incline Bench Row.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1VouVEJd6gc-SxdPV3zKWUP7fNyIPH64G/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1VouVEJd6gc-SxdPV3zKWUP7fNyIPH64G/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1RrhpvOTgf6hYVY4YA9Cqan-f6XGuLC-Q",
    "fileName": "Dumbbell Incline Row.mp4",
    "name": "Dumbbell Incline Row",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Incline Row.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1RrhpvOTgf6hYVY4YA9Cqan-f6XGuLC-Q/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1RrhpvOTgf6hYVY4YA9Cqan-f6XGuLC-Q/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1ri9qAuQCcYQFpKFDZagIOA3aAxakVCHY",
    "fileName": "Dumbbell Lying Rear Delt Row.mp4",
    "name": "Dumbbell Lying Rear Delt Row",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Lying Rear Delt Row.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1ri9qAuQCcYQFpKFDZagIOA3aAxakVCHY/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1ri9qAuQCcYQFpKFDZagIOA3aAxakVCHY/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1bM4PK-hlbvtASFH2Na7taBcKat98jLBk",
    "fileName": "Dumbbell Palm Rotational Bent Over Row.mp4",
    "name": "Dumbbell Palm Rotational Bent Over Row",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Palm Rotational Bent Over Row.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1bM4PK-hlbvtASFH2Na7taBcKat98jLBk/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1bM4PK-hlbvtASFH2Na7taBcKat98jLBk/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1FS1mMxqrbVgvHzwnZE8ieORHJJ0Djz4h",
    "fileName": "Dumbbell Reverse Grip Row.mp4",
    "name": "Dumbbell Reverse Grip Row",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Reverse Grip Row.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1FS1mMxqrbVgvHzwnZE8ieORHJJ0Djz4h/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1FS1mMxqrbVgvHzwnZE8ieORHJJ0Djz4h/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1XTeAyuO9J67S6u9m8JZTJaFd3xRrcjFH",
    "fileName": "Dumbbell Stiff Leg Deadlift.mp4",
    "name": "Dumbbell Stiff Leg Deadlift",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Stiff Leg Deadlift.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1XTeAyuO9J67S6u9m8JZTJaFd3xRrcjFH/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1XTeAyuO9J67S6u9m8JZTJaFd3xRrcjFH/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1UEDnm764wO1sqtppVhmE9BSClI0SztIm",
    "fileName": "Hammer Grip Pull-up.mp4",
    "name": "Hammer Grip Pull-up",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Hammer Grip Pull-up.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1UEDnm764wO1sqtppVhmE9BSClI0SztIm/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1UEDnm764wO1sqtppVhmE9BSClI0SztIm/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "18nTUkv5wfddO9hmLitE8iJlwS8Tkk90g",
    "fileName": "Inverted Row Between Chairs.mp4",
    "name": "Inverted Row Between Chairs",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Inverted Row Between Chairs.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/18nTUkv5wfddO9hmLitE8iJlwS8Tkk90g/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/18nTUkv5wfddO9hmLitE8iJlwS8Tkk90g/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1AJXa6OMmgF2pqeGFRgONMIhZgdvsSbuy",
    "fileName": "Inverted Row With Straps.mp4",
    "name": "Inverted Row With Straps",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Inverted Row With Straps.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1AJXa6OMmgF2pqeGFRgONMIhZgdvsSbuy/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1AJXa6OMmgF2pqeGFRgONMIhZgdvsSbuy/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "14vy-7TF_iQRSsgRJmDv_G5jP94J_pIxe",
    "fileName": "Kettlebell Deadlift.mp4",
    "name": "Kettlebell Deadlift",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Kettlebell Deadlift.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/14vy-7TF_iQRSsgRJmDv_G5jP94J_pIxe/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/14vy-7TF_iQRSsgRJmDv_G5jP94J_pIxe/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1nBP8tihCKKAhdrf5l7JeF5HqL99Y_CTs",
    "fileName": "Lever Back Extension.mp4",
    "name": "Lever Back Extension",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Back Extension.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1nBP8tihCKKAhdrf5l7JeF5HqL99Y_CTs/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1nBP8tihCKKAhdrf5l7JeF5HqL99Y_CTs/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1rLOn1z6NJcw8-9uf3emG990d9wFuG1tg",
    "fileName": "Lever High Row.mp4",
    "name": "Lever High Row",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever High Row.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1rLOn1z6NJcw8-9uf3emG990d9wFuG1tg/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1rLOn1z6NJcw8-9uf3emG990d9wFuG1tg/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1DLFpBFcpA_IKWMqqzREBS_SM-nqnVqtg",
    "fileName": "Lever Reverse Hyperextension.mp4",
    "name": "Lever Reverse Hyperextension",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Reverse Hyperextension.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1DLFpBFcpA_IKWMqqzREBS_SM-nqnVqtg/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1DLFpBFcpA_IKWMqqzREBS_SM-nqnVqtg/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1Dd7usJibimGM7N8rEm_FeVLjSGuKgz_a",
    "fileName": "Lever Reverse T-Bar Row.mp4",
    "name": "Lever Reverse T-Bar Row",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Reverse T-Bar Row.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1Dd7usJibimGM7N8rEm_FeVLjSGuKgz_a/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Dd7usJibimGM7N8rEm_FeVLjSGuKgz_a/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1NHP45mdwxMPsdlfy0vVcKwjYECJXRgtd",
    "fileName": "Lever T-bar Row.mp4",
    "name": "Lever T-bar Row",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever T-bar Row.",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1NHP45mdwxMPsdlfy0vVcKwjYECJXRgtd/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1NHP45mdwxMPsdlfy0vVcKwjYECJXRgtd/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "18VNHx3JzqRZxuaF7lskGH-oNDRmjVMK_",
    "fileName": "Pull-up (shoulder grip).mp4",
    "name": "Pull-up (shoulder grip)",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Pull-up (shoulder grip).",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/18VNHx3JzqRZxuaF7lskGH-oNDRmjVMK_/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/18VNHx3JzqRZxuaF7lskGH-oNDRmjVMK_/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1NoHXFGOCwqlTV7w0EhhUqlK8fgz1byDp",
    "fileName": "Pull-up (wide back grip).mp4",
    "name": "Pull-up (wide back grip)",
    "gender": "MEN",
    "subfolderCategory": "back",
    "muscleGroup": "BACK",
    "targetMuscles": "Lats, Upper Back & Rhomboids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Pull-up (wide back grip).",
      "02 Movement: Perform controlled execution targeting Lats, Upper Back & Rhomboids.",
      "03 Form lock: Initiate pull from the scapula, drive elbows down and back."
    ],
    "keyFormTip": "Initiate pull from the scapula, drive elbows down and back.",
    "driveUrl": "https://drive.google.com/file/d/1NoHXFGOCwqlTV7w0EhhUqlK8fgz1byDp/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1NoHXFGOCwqlTV7w0EhhUqlK8fgz1byDp/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "back"
    ]
  },
  {
    "id": "1Y23KHuoHMeStkSYwjMHyZXjQLr8FYB-Z",
    "fileName": "Barbell Curl.mp4",
    "name": "Barbell Curl",
    "gender": "MEN",
    "subfolderCategory": "biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Curl.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/1Y23KHuoHMeStkSYwjMHyZXjQLr8FYB-Z/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Y23KHuoHMeStkSYwjMHyZXjQLr8FYB-Z/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "biceps"
    ]
  },
  {
    "id": "107p6HozJdvzPhYTGhPT6pkYcVX_hmxa8",
    "fileName": "Barbell Drag Curl.mp4",
    "name": "Barbell Drag Curl",
    "gender": "MEN",
    "subfolderCategory": "biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Drag Curl.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/107p6HozJdvzPhYTGhPT6pkYcVX_hmxa8/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/107p6HozJdvzPhYTGhPT6pkYcVX_hmxa8/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "biceps"
    ]
  },
  {
    "id": "1-e-jdJWMaDf03EH3K3MvLznGluJh7tsp",
    "fileName": "Barbell Prone Incline Curl.mp4",
    "name": "Barbell Prone Incline Curl",
    "gender": "MEN",
    "subfolderCategory": "biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Prone Incline Curl.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/1-e-jdJWMaDf03EH3K3MvLznGluJh7tsp/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1-e-jdJWMaDf03EH3K3MvLznGluJh7tsp/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "biceps"
    ]
  },
  {
    "id": "1A84yFTdRawaz_ZtgmVJvCamYoSGKWPCE",
    "fileName": "Cable One Arm Curl.mp4",
    "name": "Cable One Arm Curl",
    "gender": "MEN",
    "subfolderCategory": "biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable One Arm Curl.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/1A84yFTdRawaz_ZtgmVJvCamYoSGKWPCE/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1A84yFTdRawaz_ZtgmVJvCamYoSGKWPCE/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "biceps"
    ]
  },
  {
    "id": "1JgBm1cjgx9-X2pMLc-fOQkOupsXSdS9M",
    "fileName": "Cable Standing Inner Curl.mp4",
    "name": "Cable Standing Inner Curl",
    "gender": "MEN",
    "subfolderCategory": "biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Standing Inner Curl.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/1JgBm1cjgx9-X2pMLc-fOQkOupsXSdS9M/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1JgBm1cjgx9-X2pMLc-fOQkOupsXSdS9M/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "biceps"
    ]
  },
  {
    "id": "1Vi7qbRNGwEM4BuIKWzXCF5XbZZLhpD0d",
    "fileName": "Dumbbell Alternate Biceps Curl.mp4",
    "name": "Dumbbell Alternate Biceps Curl",
    "gender": "MEN",
    "subfolderCategory": "biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Alternate Biceps Curl.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/1Vi7qbRNGwEM4BuIKWzXCF5XbZZLhpD0d/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Vi7qbRNGwEM4BuIKWzXCF5XbZZLhpD0d/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "biceps"
    ]
  },
  {
    "id": "1D21hUas5jMsX-YuhS3h3iDq8_y1i02bg",
    "fileName": "Dumbbell Alternate Seated Biceps Curl.mp4",
    "name": "Dumbbell Alternate Seated Biceps Curl",
    "gender": "MEN",
    "subfolderCategory": "biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Alternate Seated Biceps Curl.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/1D21hUas5jMsX-YuhS3h3iDq8_y1i02bg/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1D21hUas5jMsX-YuhS3h3iDq8_y1i02bg/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "biceps"
    ]
  },
  {
    "id": "14OPlt9fqvQcW-VWCootao_ZYXQg9MFDW",
    "fileName": "Dumbbell Biceps Curl.mp4",
    "name": "Dumbbell Biceps Curl",
    "gender": "MEN",
    "subfolderCategory": "biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Biceps Curl.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/14OPlt9fqvQcW-VWCootao_ZYXQg9MFDW/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/14OPlt9fqvQcW-VWCootao_ZYXQg9MFDW/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "biceps"
    ]
  },
  {
    "id": "1ydG8u6dJIlbWEP8pO3EGsld72WciR8UN",
    "fileName": "Dumbbell Concentration Curl.mp4",
    "name": "Dumbbell Concentration Curl",
    "gender": "MEN",
    "subfolderCategory": "biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Concentration Curl.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/1ydG8u6dJIlbWEP8pO3EGsld72WciR8UN/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1ydG8u6dJIlbWEP8pO3EGsld72WciR8UN/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "biceps"
    ]
  },
  {
    "id": "1RPmjjnObL_LIIjbHzWm8TSuyrrcAwcNr",
    "fileName": "Dumbbell Cross Body Hammer Curl.mp4",
    "name": "Dumbbell Cross Body Hammer Curl",
    "gender": "MEN",
    "subfolderCategory": "biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Cross Body Hammer Curl.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/1RPmjjnObL_LIIjbHzWm8TSuyrrcAwcNr/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1RPmjjnObL_LIIjbHzWm8TSuyrrcAwcNr/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "biceps"
    ]
  },
  {
    "id": "1EVmFHYoSGSp3bIZSRALOBnk85RP6mWTR",
    "fileName": "Dumbbell Incline Biceps Curl.mp4",
    "name": "Dumbbell Incline Biceps Curl",
    "gender": "MEN",
    "subfolderCategory": "biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Incline Biceps Curl.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/1EVmFHYoSGSp3bIZSRALOBnk85RP6mWTR/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1EVmFHYoSGSp3bIZSRALOBnk85RP6mWTR/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "biceps"
    ]
  },
  {
    "id": "1UtxPc8DELuJt_Hbst9swuxKU2uDSAZE_",
    "fileName": "Dumbbell Incline Curl.mp4",
    "name": "Dumbbell Incline Curl",
    "gender": "MEN",
    "subfolderCategory": "biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Incline Curl.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/1UtxPc8DELuJt_Hbst9swuxKU2uDSAZE_/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1UtxPc8DELuJt_Hbst9swuxKU2uDSAZE_/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "biceps"
    ]
  },
  {
    "id": "15ImO19qsgkNuoPMoLcMaB1Mvk9tJkfLb",
    "fileName": "Dumbbell Incline Hammer Curl.mp4",
    "name": "Dumbbell Incline Hammer Curl",
    "gender": "MEN",
    "subfolderCategory": "biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Incline Hammer Curl.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/15ImO19qsgkNuoPMoLcMaB1Mvk9tJkfLb/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/15ImO19qsgkNuoPMoLcMaB1Mvk9tJkfLb/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "biceps"
    ]
  },
  {
    "id": "1pfgmf8e_bY5y6-r6LKnLneBggrPkQaxY",
    "fileName": "Dumbbell One Arm Zottman Preacher Curl.mp4",
    "name": "Dumbbell One Arm Zottman Preacher Curl",
    "gender": "MEN",
    "subfolderCategory": "biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell One Arm Zottman Preacher Curl.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/1pfgmf8e_bY5y6-r6LKnLneBggrPkQaxY/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1pfgmf8e_bY5y6-r6LKnLneBggrPkQaxY/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "biceps"
    ]
  },
  {
    "id": "1lPRTgN6KWtXo9zQnFhv6qYfJJLNa82k7",
    "fileName": "Dumbbell Preacher Curl Over Exercise Ball.mp4",
    "name": "Dumbbell Preacher Curl Over Exercise Ball",
    "gender": "MEN",
    "subfolderCategory": "biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Preacher Curl Over Exercise Ball.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/1lPRTgN6KWtXo9zQnFhv6qYfJJLNa82k7/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1lPRTgN6KWtXo9zQnFhv6qYfJJLNa82k7/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "biceps"
    ]
  },
  {
    "id": "1wj3jEEOtzXHSv0cekt2o1491upOOkZzw",
    "fileName": "Dumbbell Prone Incline Curl.mp4",
    "name": "Dumbbell Prone Incline Curl",
    "gender": "MEN",
    "subfolderCategory": "biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Prone Incline Curl.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/1wj3jEEOtzXHSv0cekt2o1491upOOkZzw/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1wj3jEEOtzXHSv0cekt2o1491upOOkZzw/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "biceps"
    ]
  },
  {
    "id": "1eMd4-rb7Vsu_JVGo3KlayitrKpkCqZHJ",
    "fileName": "Dumbbell Seated Preacher Curl.mp4",
    "name": "Dumbbell Seated Preacher Curl",
    "gender": "MEN",
    "subfolderCategory": "biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Seated Preacher Curl.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/1eMd4-rb7Vsu_JVGo3KlayitrKpkCqZHJ/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1eMd4-rb7Vsu_JVGo3KlayitrKpkCqZHJ/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "biceps"
    ]
  },
  {
    "id": "1A1VMuILb40QBK4LARkeY_ohvbRI560CB",
    "fileName": "EZ Barbell Biceps Curl.mp4",
    "name": "EZ Barbell Biceps Curl",
    "gender": "MEN",
    "subfolderCategory": "biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for EZ Barbell Biceps Curl.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/1A1VMuILb40QBK4LARkeY_ohvbRI560CB/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1A1VMuILb40QBK4LARkeY_ohvbRI560CB/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "biceps"
    ]
  },
  {
    "id": "1m605ks-4srUldpYJJOa7OZzACndOfVNA",
    "fileName": "Lever Preacher Curl.mp4",
    "name": "Lever Preacher Curl",
    "gender": "MEN",
    "subfolderCategory": "biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Preacher Curl.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/1m605ks-4srUldpYJJOa7OZzACndOfVNA/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1m605ks-4srUldpYJJOa7OZzACndOfVNA/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "biceps"
    ]
  },
  {
    "id": "1VTMpeJQZPxLwCVYWis7LHJ1Vpst6y-Zz",
    "fileName": "Lying Supine Dumbbell Curl.mp4",
    "name": "Lying Supine Dumbbell Curl",
    "gender": "MEN",
    "subfolderCategory": "biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lying Supine Dumbbell Curl.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/1VTMpeJQZPxLwCVYWis7LHJ1Vpst6y-Zz/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1VTMpeJQZPxLwCVYWis7LHJ1Vpst6y-Zz/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "biceps"
    ]
  },
  {
    "id": "1q2vXFRIEsaPrHdSfZToIH9VSxH9enNax",
    "fileName": "Stretching - Butterfly Yoga Pose.mp4",
    "name": "Stretching - Butterfly Yoga Pose",
    "gender": "MEN",
    "subfolderCategory": "biceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Biceps Brachii & Brachialis",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Butterfly Yoga Pose.",
      "02 Movement: Perform controlled execution targeting Biceps Brachii & Brachialis.",
      "03 Form lock: Pin elbows at sides, squeeze hard at peak contraction."
    ],
    "keyFormTip": "Pin elbows at sides, squeeze hard at peak contraction.",
    "driveUrl": "https://drive.google.com/file/d/1q2vXFRIEsaPrHdSfZToIH9VSxH9enNax/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1q2vXFRIEsaPrHdSfZToIH9VSxH9enNax/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "biceps"
    ]
  },
  {
    "id": "16g8oUxiSV9ldiHxSxfjznRN3YNjdwO9_",
    "fileName": "Band Standing Calf Raise.mp4",
    "name": "Band Standing Calf Raise",
    "gender": "MEN",
    "subfolderCategory": "calves",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gastrocnemius & Soleus",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Standing Calf Raise.",
      "02 Movement: Perform controlled execution targeting Gastrocnemius & Soleus.",
      "03 Form lock: Pause 2 seconds at full stretch, drive through ball of big toe."
    ],
    "keyFormTip": "Pause 2 seconds at full stretch, drive through ball of big toe.",
    "driveUrl": "https://drive.google.com/file/d/16g8oUxiSV9ldiHxSxfjznRN3YNjdwO9_/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/16g8oUxiSV9ldiHxSxfjznRN3YNjdwO9_/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "calves"
    ]
  },
  {
    "id": "1zoxhYEOP1yBM_-bUlz5I14ckJVlHak_Y",
    "fileName": "Donkey Calf Raise.mp4",
    "name": "Donkey Calf Raise",
    "gender": "MEN",
    "subfolderCategory": "calves",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gastrocnemius & Soleus",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Donkey Calf Raise.",
      "02 Movement: Perform controlled execution targeting Gastrocnemius & Soleus.",
      "03 Form lock: Pause 2 seconds at full stretch, drive through ball of big toe."
    ],
    "keyFormTip": "Pause 2 seconds at full stretch, drive through ball of big toe.",
    "driveUrl": "https://drive.google.com/file/d/1zoxhYEOP1yBM_-bUlz5I14ckJVlHak_Y/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1zoxhYEOP1yBM_-bUlz5I14ckJVlHak_Y/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "calves"
    ]
  },
  {
    "id": "1Zf8oZxDQ8eACUOudQ5dCWZaYp6W8qAHT",
    "fileName": "Dumbbell Seated Calf Raise.mp4",
    "name": "Dumbbell Seated Calf Raise",
    "gender": "MEN",
    "subfolderCategory": "calves",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gastrocnemius & Soleus",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Seated Calf Raise.",
      "02 Movement: Perform controlled execution targeting Gastrocnemius & Soleus.",
      "03 Form lock: Pause 2 seconds at full stretch, drive through ball of big toe."
    ],
    "keyFormTip": "Pause 2 seconds at full stretch, drive through ball of big toe.",
    "driveUrl": "https://drive.google.com/file/d/1Zf8oZxDQ8eACUOudQ5dCWZaYp6W8qAHT/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Zf8oZxDQ8eACUOudQ5dCWZaYp6W8qAHT/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "calves"
    ]
  },
  {
    "id": "1L0VoAO3seUOaBJyQE5ULtbIpx6l2JouF",
    "fileName": "Dumbbell Single Leg Calf Raise.mp4",
    "name": "Dumbbell Single Leg Calf Raise",
    "gender": "MEN",
    "subfolderCategory": "calves",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gastrocnemius & Soleus",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Single Leg Calf Raise.",
      "02 Movement: Perform controlled execution targeting Gastrocnemius & Soleus.",
      "03 Form lock: Pause 2 seconds at full stretch, drive through ball of big toe."
    ],
    "keyFormTip": "Pause 2 seconds at full stretch, drive through ball of big toe.",
    "driveUrl": "https://drive.google.com/file/d/1L0VoAO3seUOaBJyQE5ULtbIpx6l2JouF/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1L0VoAO3seUOaBJyQE5ULtbIpx6l2JouF/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "calves"
    ]
  },
  {
    "id": "1YnfGJRumagd3LHhGxwSA4UPUmK1gW3Ng",
    "fileName": "Dumbbell Standing Calf Raise.mp4",
    "name": "Dumbbell Standing Calf Raise",
    "gender": "MEN",
    "subfolderCategory": "calves",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gastrocnemius & Soleus",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Standing Calf Raise.",
      "02 Movement: Perform controlled execution targeting Gastrocnemius & Soleus.",
      "03 Form lock: Pause 2 seconds at full stretch, drive through ball of big toe."
    ],
    "keyFormTip": "Pause 2 seconds at full stretch, drive through ball of big toe.",
    "driveUrl": "https://drive.google.com/file/d/1YnfGJRumagd3LHhGxwSA4UPUmK1gW3Ng/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1YnfGJRumagd3LHhGxwSA4UPUmK1gW3Ng/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "calves"
    ]
  },
  {
    "id": "1bcpsTaw_eQpQQw-q9_EvjZOe_pk61zzb",
    "fileName": "Lever Seated Calf Raise.mp4",
    "name": "Lever Seated Calf Raise",
    "gender": "MEN",
    "subfolderCategory": "calves",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gastrocnemius & Soleus",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Seated Calf Raise.",
      "02 Movement: Perform controlled execution targeting Gastrocnemius & Soleus.",
      "03 Form lock: Pause 2 seconds at full stretch, drive through ball of big toe."
    ],
    "keyFormTip": "Pause 2 seconds at full stretch, drive through ball of big toe.",
    "driveUrl": "https://drive.google.com/file/d/1bcpsTaw_eQpQQw-q9_EvjZOe_pk61zzb/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1bcpsTaw_eQpQQw-q9_EvjZOe_pk61zzb/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "calves"
    ]
  },
  {
    "id": "10U0QmwZRbqj8tqEsiMPcscZrtYbK2zeP",
    "fileName": "Lever Standing Calf Raise.mp4",
    "name": "Lever Standing Calf Raise",
    "gender": "MEN",
    "subfolderCategory": "calves",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gastrocnemius & Soleus",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Standing Calf Raise.",
      "02 Movement: Perform controlled execution targeting Gastrocnemius & Soleus.",
      "03 Form lock: Pause 2 seconds at full stretch, drive through ball of big toe."
    ],
    "keyFormTip": "Pause 2 seconds at full stretch, drive through ball of big toe.",
    "driveUrl": "https://drive.google.com/file/d/10U0QmwZRbqj8tqEsiMPcscZrtYbK2zeP/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/10U0QmwZRbqj8tqEsiMPcscZrtYbK2zeP/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "calves"
    ]
  },
  {
    "id": "1WX3WIyroScP5BJ4Zt1lc2mRHHABOWgIm",
    "fileName": "Sled 45 Degree Calf Press.mp4",
    "name": "Sled 45 Degree Calf Press",
    "gender": "MEN",
    "subfolderCategory": "calves",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gastrocnemius & Soleus",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Sled 45 Degree Calf Press.",
      "02 Movement: Perform controlled execution targeting Gastrocnemius & Soleus.",
      "03 Form lock: Pause 2 seconds at full stretch, drive through ball of big toe."
    ],
    "keyFormTip": "Pause 2 seconds at full stretch, drive through ball of big toe.",
    "driveUrl": "https://drive.google.com/file/d/1WX3WIyroScP5BJ4Zt1lc2mRHHABOWgIm/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1WX3WIyroScP5BJ4Zt1lc2mRHHABOWgIm/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "calves"
    ]
  },
  {
    "id": "1yTBTj1HV-CJ1kHDZcixv7QtDZu7UxfFf",
    "fileName": "Smith Calf Raise.mp4",
    "name": "Smith Calf Raise",
    "gender": "MEN",
    "subfolderCategory": "calves",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gastrocnemius & Soleus",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Smith Calf Raise.",
      "02 Movement: Perform controlled execution targeting Gastrocnemius & Soleus.",
      "03 Form lock: Pause 2 seconds at full stretch, drive through ball of big toe."
    ],
    "keyFormTip": "Pause 2 seconds at full stretch, drive through ball of big toe.",
    "driveUrl": "https://drive.google.com/file/d/1yTBTj1HV-CJ1kHDZcixv7QtDZu7UxfFf/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1yTBTj1HV-CJ1kHDZcixv7QtDZu7UxfFf/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "calves"
    ]
  },
  {
    "id": "11jMJoFOuFvUighi0K9CWy2CPssxN_bUx",
    "fileName": "Stretching - Calf Stretch with Rope.mp4",
    "name": "Stretching - Calf Stretch with Rope",
    "gender": "MEN",
    "subfolderCategory": "calves",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gastrocnemius & Soleus",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Calf Stretch with Rope.",
      "02 Movement: Perform controlled execution targeting Gastrocnemius & Soleus.",
      "03 Form lock: Pause 2 seconds at full stretch, drive through ball of big toe."
    ],
    "keyFormTip": "Pause 2 seconds at full stretch, drive through ball of big toe.",
    "driveUrl": "https://drive.google.com/file/d/11jMJoFOuFvUighi0K9CWy2CPssxN_bUx/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/11jMJoFOuFvUighi0K9CWy2CPssxN_bUx/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "calves"
    ]
  },
  {
    "id": "1ZmERUtaF9QehlEXsjup4P_lVMJrCqOsF",
    "fileName": "Stretching - Calf Stretch with Strap.mp4",
    "name": "Stretching - Calf Stretch with Strap",
    "gender": "MEN",
    "subfolderCategory": "calves",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gastrocnemius & Soleus",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Calf Stretch with Strap.",
      "02 Movement: Perform controlled execution targeting Gastrocnemius & Soleus.",
      "03 Form lock: Pause 2 seconds at full stretch, drive through ball of big toe."
    ],
    "keyFormTip": "Pause 2 seconds at full stretch, drive through ball of big toe.",
    "driveUrl": "https://drive.google.com/file/d/1ZmERUtaF9QehlEXsjup4P_lVMJrCqOsF/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1ZmERUtaF9QehlEXsjup4P_lVMJrCqOsF/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "calves"
    ]
  },
  {
    "id": "1VDkcT-dpZh_XaZ-_qiRtemuR463F7Rgf",
    "fileName": "Stretching - Circles Knee Stretch.mp4",
    "name": "Stretching - Circles Knee Stretch",
    "gender": "MEN",
    "subfolderCategory": "calves",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gastrocnemius & Soleus",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Circles Knee Stretch.",
      "02 Movement: Perform controlled execution targeting Gastrocnemius & Soleus.",
      "03 Form lock: Pause 2 seconds at full stretch, drive through ball of big toe."
    ],
    "keyFormTip": "Pause 2 seconds at full stretch, drive through ball of big toe.",
    "driveUrl": "https://drive.google.com/file/d/1VDkcT-dpZh_XaZ-_qiRtemuR463F7Rgf/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1VDkcT-dpZh_XaZ-_qiRtemuR463F7Rgf/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "calves"
    ]
  },
  {
    "id": "1Qq-pN_tvuJohFH7NCY_Gwx0il1LB4KK4",
    "fileName": "Stretching - Feet and Ankles Rotation Stretch.mp4",
    "name": "Stretching - Feet and Ankles Rotation Stretch",
    "gender": "MEN",
    "subfolderCategory": "calves",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gastrocnemius & Soleus",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Feet and Ankles Rotation Stretch.",
      "02 Movement: Perform controlled execution targeting Gastrocnemius & Soleus.",
      "03 Form lock: Pause 2 seconds at full stretch, drive through ball of big toe."
    ],
    "keyFormTip": "Pause 2 seconds at full stretch, drive through ball of big toe.",
    "driveUrl": "https://drive.google.com/file/d/1Qq-pN_tvuJohFH7NCY_Gwx0il1LB4KK4/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Qq-pN_tvuJohFH7NCY_Gwx0il1LB4KK4/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "calves"
    ]
  },
  {
    "id": "1RJFY0qmkCwNZpfGWEOmh1ewrF2mAUaK5",
    "fileName": "Stretching - Feet and Ankles Stretch.mp4",
    "name": "Stretching - Feet and Ankles Stretch",
    "gender": "MEN",
    "subfolderCategory": "calves",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gastrocnemius & Soleus",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Feet and Ankles Stretch.",
      "02 Movement: Perform controlled execution targeting Gastrocnemius & Soleus.",
      "03 Form lock: Pause 2 seconds at full stretch, drive through ball of big toe."
    ],
    "keyFormTip": "Pause 2 seconds at full stretch, drive through ball of big toe.",
    "driveUrl": "https://drive.google.com/file/d/1RJFY0qmkCwNZpfGWEOmh1ewrF2mAUaK5/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1RJFY0qmkCwNZpfGWEOmh1ewrF2mAUaK5/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "calves"
    ]
  },
  {
    "id": "1oIbpjv8-Fep-xTfsIhnVxkbMPvc8fVhH",
    "fileName": "Stretching - Peroneals Stretch.mp4",
    "name": "Stretching - Peroneals Stretch",
    "gender": "MEN",
    "subfolderCategory": "calves",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gastrocnemius & Soleus",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Peroneals Stretch.",
      "02 Movement: Perform controlled execution targeting Gastrocnemius & Soleus.",
      "03 Form lock: Pause 2 seconds at full stretch, drive through ball of big toe."
    ],
    "keyFormTip": "Pause 2 seconds at full stretch, drive through ball of big toe.",
    "driveUrl": "https://drive.google.com/file/d/1oIbpjv8-Fep-xTfsIhnVxkbMPvc8fVhH/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1oIbpjv8-Fep-xTfsIhnVxkbMPvc8fVhH/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "calves"
    ]
  },
  {
    "id": "1r5sD7CikM7n_hCvamzLqRYvr3yUMSfnv",
    "fileName": "Stretching - Seated Calf Stretch.mp4",
    "name": "Stretching - Seated Calf Stretch",
    "gender": "MEN",
    "subfolderCategory": "calves",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gastrocnemius & Soleus",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Seated Calf Stretch.",
      "02 Movement: Perform controlled execution targeting Gastrocnemius & Soleus.",
      "03 Form lock: Pause 2 seconds at full stretch, drive through ball of big toe."
    ],
    "keyFormTip": "Pause 2 seconds at full stretch, drive through ball of big toe.",
    "driveUrl": "https://drive.google.com/file/d/1r5sD7CikM7n_hCvamzLqRYvr3yUMSfnv/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1r5sD7CikM7n_hCvamzLqRYvr3yUMSfnv/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "calves"
    ]
  },
  {
    "id": "1FaCTNiZ4uoNqhAJymooK_egJGr-arlUx",
    "fileName": "Stretching - Stairs Calf Stretch.mp4",
    "name": "Stretching - Stairs Calf Stretch",
    "gender": "MEN",
    "subfolderCategory": "calves",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gastrocnemius & Soleus",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Stairs Calf Stretch.",
      "02 Movement: Perform controlled execution targeting Gastrocnemius & Soleus.",
      "03 Form lock: Pause 2 seconds at full stretch, drive through ball of big toe."
    ],
    "keyFormTip": "Pause 2 seconds at full stretch, drive through ball of big toe.",
    "driveUrl": "https://drive.google.com/file/d/1FaCTNiZ4uoNqhAJymooK_egJGr-arlUx/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1FaCTNiZ4uoNqhAJymooK_egJGr-arlUx/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "calves"
    ]
  },
  {
    "id": "1w4v6JPv_rQNz0Gv7dTo3pvUvO1Y-hoN6",
    "fileName": "Stretching - Standing Bench Calf Stretch.mp4",
    "name": "Stretching - Standing Bench Calf Stretch",
    "gender": "MEN",
    "subfolderCategory": "calves",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gastrocnemius & Soleus",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Standing Bench Calf Stretch.",
      "02 Movement: Perform controlled execution targeting Gastrocnemius & Soleus.",
      "03 Form lock: Pause 2 seconds at full stretch, drive through ball of big toe."
    ],
    "keyFormTip": "Pause 2 seconds at full stretch, drive through ball of big toe.",
    "driveUrl": "https://drive.google.com/file/d/1w4v6JPv_rQNz0Gv7dTo3pvUvO1Y-hoN6/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1w4v6JPv_rQNz0Gv7dTo3pvUvO1Y-hoN6/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "calves"
    ]
  },
  {
    "id": "1z47UTU0UgUulOolW8-0tstU1IrpLHOX9",
    "fileName": "Battling Ropes.mp4",
    "name": "Battling Ropes",
    "gender": "MEN",
    "subfolderCategory": "cardio",
    "muscleGroup": "CARDIO",
    "targetMuscles": "Cardiovascular System & Full Body Conditioning",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "45-60s",
    "suggestedRestSeconds": 30,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Battling Ropes.",
      "02 Movement: Perform controlled execution targeting Cardiovascular System & Full Body Conditioning.",
      "03 Form lock: Maintain continuous rhythm, keep core tight and breathe rhythmically."
    ],
    "keyFormTip": "Maintain continuous rhythm, keep core tight and breathe rhythmically.",
    "driveUrl": "https://drive.google.com/file/d/1z47UTU0UgUulOolW8-0tstU1IrpLHOX9/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1z47UTU0UgUulOolW8-0tstU1IrpLHOX9/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "cardio"
    ]
  },
  {
    "id": "1L2OHy9VynR5EQCWzxw7iOdNaJzuXD2aH",
    "fileName": "Burpee.mp4",
    "name": "Burpee",
    "gender": "MEN",
    "subfolderCategory": "cardio",
    "muscleGroup": "CARDIO",
    "targetMuscles": "Cardiovascular System & Full Body Conditioning",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "45-60s",
    "suggestedRestSeconds": 30,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Burpee.",
      "02 Movement: Perform controlled execution targeting Cardiovascular System & Full Body Conditioning.",
      "03 Form lock: Maintain continuous rhythm, keep core tight and breathe rhythmically."
    ],
    "keyFormTip": "Maintain continuous rhythm, keep core tight and breathe rhythmically.",
    "driveUrl": "https://drive.google.com/file/d/1L2OHy9VynR5EQCWzxw7iOdNaJzuXD2aH/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1L2OHy9VynR5EQCWzxw7iOdNaJzuXD2aH/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "cardio"
    ]
  },
  {
    "id": "1NLZUWVP-8K09E39QGOe_03GinQ1czGGR",
    "fileName": "Cardio Exercises Machines.mp4",
    "name": "Cardio Exercises Machines",
    "gender": "MEN",
    "subfolderCategory": "cardio",
    "muscleGroup": "CARDIO",
    "targetMuscles": "Cardiovascular System & Full Body Conditioning",
    "equipment": "FULL_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "45-60s",
    "suggestedRestSeconds": 30,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cardio Exercises Machines.",
      "02 Movement: Perform controlled execution targeting Cardiovascular System & Full Body Conditioning.",
      "03 Form lock: Maintain continuous rhythm, keep core tight and breathe rhythmically."
    ],
    "keyFormTip": "Maintain continuous rhythm, keep core tight and breathe rhythmically.",
    "driveUrl": "https://drive.google.com/file/d/1NLZUWVP-8K09E39QGOe_03GinQ1czGGR/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1NLZUWVP-8K09E39QGOe_03GinQ1czGGR/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "cardio"
    ]
  },
  {
    "id": "1z2S_knssSNgP80r4zrFuoDKgHmVgsACq",
    "fileName": "Cardio Exercises.mp4",
    "name": "Cardio Exercises",
    "gender": "MEN",
    "subfolderCategory": "cardio",
    "muscleGroup": "CARDIO",
    "targetMuscles": "Cardiovascular System & Full Body Conditioning",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "45-60s",
    "suggestedRestSeconds": 30,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cardio Exercises.",
      "02 Movement: Perform controlled execution targeting Cardiovascular System & Full Body Conditioning.",
      "03 Form lock: Maintain continuous rhythm, keep core tight and breathe rhythmically."
    ],
    "keyFormTip": "Maintain continuous rhythm, keep core tight and breathe rhythmically.",
    "driveUrl": "https://drive.google.com/file/d/1z2S_knssSNgP80r4zrFuoDKgHmVgsACq/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1z2S_knssSNgP80r4zrFuoDKgHmVgsACq/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "cardio"
    ]
  },
  {
    "id": "1FU_PR-KAOXazlirWfFWFhoBUEoas2NTJ",
    "fileName": "Elliptical.mp4",
    "name": "Elliptical",
    "gender": "MEN",
    "subfolderCategory": "cardio",
    "muscleGroup": "CARDIO",
    "targetMuscles": "Cardiovascular System & Full Body Conditioning",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "45-60s",
    "suggestedRestSeconds": 30,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Elliptical.",
      "02 Movement: Perform controlled execution targeting Cardiovascular System & Full Body Conditioning.",
      "03 Form lock: Maintain continuous rhythm, keep core tight and breathe rhythmically."
    ],
    "keyFormTip": "Maintain continuous rhythm, keep core tight and breathe rhythmically.",
    "driveUrl": "https://drive.google.com/file/d/1FU_PR-KAOXazlirWfFWFhoBUEoas2NTJ/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1FU_PR-KAOXazlirWfFWFhoBUEoas2NTJ/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "cardio"
    ]
  },
  {
    "id": "1hsDGmPWrdwd-Rno6Bq8LRdUM0mm6_GH4",
    "fileName": "Jump Rope.mp4",
    "name": "Jump Rope",
    "gender": "MEN",
    "subfolderCategory": "cardio",
    "muscleGroup": "CARDIO",
    "targetMuscles": "Cardiovascular System & Full Body Conditioning",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "45-60s",
    "suggestedRestSeconds": 30,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Jump Rope.",
      "02 Movement: Perform controlled execution targeting Cardiovascular System & Full Body Conditioning.",
      "03 Form lock: Maintain continuous rhythm, keep core tight and breathe rhythmically."
    ],
    "keyFormTip": "Maintain continuous rhythm, keep core tight and breathe rhythmically.",
    "driveUrl": "https://drive.google.com/file/d/1hsDGmPWrdwd-Rno6Bq8LRdUM0mm6_GH4/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1hsDGmPWrdwd-Rno6Bq8LRdUM0mm6_GH4/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "cardio"
    ]
  },
  {
    "id": "1z_K6AUfcgphQznvn3_JtWfDADitoOLvM",
    "fileName": "Jump Step-up.mp4",
    "name": "Jump Step-up",
    "gender": "MEN",
    "subfolderCategory": "cardio",
    "muscleGroup": "CARDIO",
    "targetMuscles": "Cardiovascular System & Full Body Conditioning",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "45-60s",
    "suggestedRestSeconds": 30,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Jump Step-up.",
      "02 Movement: Perform controlled execution targeting Cardiovascular System & Full Body Conditioning.",
      "03 Form lock: Maintain continuous rhythm, keep core tight and breathe rhythmically."
    ],
    "keyFormTip": "Maintain continuous rhythm, keep core tight and breathe rhythmically.",
    "driveUrl": "https://drive.google.com/file/d/1z_K6AUfcgphQznvn3_JtWfDADitoOLvM/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1z_K6AUfcgphQznvn3_JtWfDADitoOLvM/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "cardio"
    ]
  },
  {
    "id": "1Xo5kn0AXK5nThWY7inelSFQ03yZvOH45",
    "fileName": "Jumping Jack.mp4",
    "name": "Jumping Jack",
    "gender": "MEN",
    "subfolderCategory": "cardio",
    "muscleGroup": "CARDIO",
    "targetMuscles": "Cardiovascular System & Full Body Conditioning",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "45-60s",
    "suggestedRestSeconds": 30,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Jumping Jack.",
      "02 Movement: Perform controlled execution targeting Cardiovascular System & Full Body Conditioning.",
      "03 Form lock: Maintain continuous rhythm, keep core tight and breathe rhythmically."
    ],
    "keyFormTip": "Maintain continuous rhythm, keep core tight and breathe rhythmically.",
    "driveUrl": "https://drive.google.com/file/d/1Xo5kn0AXK5nThWY7inelSFQ03yZvOH45/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Xo5kn0AXK5nThWY7inelSFQ03yZvOH45/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "cardio"
    ]
  },
  {
    "id": "1ho7IGbvFZYNZ-3SFAyj0tYRsIp09JRdK",
    "fileName": "Running.mp4",
    "name": "Running",
    "gender": "MEN",
    "subfolderCategory": "cardio",
    "muscleGroup": "CARDIO",
    "targetMuscles": "Cardiovascular System & Full Body Conditioning",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "45-60s",
    "suggestedRestSeconds": 30,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Running.",
      "02 Movement: Perform controlled execution targeting Cardiovascular System & Full Body Conditioning.",
      "03 Form lock: Maintain continuous rhythm, keep core tight and breathe rhythmically."
    ],
    "keyFormTip": "Maintain continuous rhythm, keep core tight and breathe rhythmically.",
    "driveUrl": "https://drive.google.com/file/d/1ho7IGbvFZYNZ-3SFAyj0tYRsIp09JRdK/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1ho7IGbvFZYNZ-3SFAyj0tYRsIp09JRdK/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "cardio"
    ]
  },
  {
    "id": "1HY2CUZVM1TMSoZF8E96lQfXMA3sR08YL",
    "fileName": "Stationary Bike.mp4",
    "name": "Stationary Bike",
    "gender": "MEN",
    "subfolderCategory": "cardio",
    "muscleGroup": "CARDIO",
    "targetMuscles": "Cardiovascular System & Full Body Conditioning",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "45-60s",
    "suggestedRestSeconds": 30,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stationary Bike.",
      "02 Movement: Perform controlled execution targeting Cardiovascular System & Full Body Conditioning.",
      "03 Form lock: Maintain continuous rhythm, keep core tight and breathe rhythmically."
    ],
    "keyFormTip": "Maintain continuous rhythm, keep core tight and breathe rhythmically.",
    "driveUrl": "https://drive.google.com/file/d/1HY2CUZVM1TMSoZF8E96lQfXMA3sR08YL/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1HY2CUZVM1TMSoZF8E96lQfXMA3sR08YL/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "cardio"
    ]
  },
  {
    "id": "1-Cwen07cNcrzj3hI67ku1Ha21vljnCgB",
    "fileName": "Stretching - Bridge Pose Setu Bandhasana (1).mp4",
    "name": "Stretching - Bridge Pose Setu Bandhasana (1)",
    "gender": "MEN",
    "subfolderCategory": "cardio",
    "muscleGroup": "CARDIO",
    "targetMuscles": "Cardiovascular System & Full Body Conditioning",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "45-60s",
    "suggestedRestSeconds": 30,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Bridge Pose Setu Bandhasana (1).",
      "02 Movement: Perform controlled execution targeting Cardiovascular System & Full Body Conditioning.",
      "03 Form lock: Maintain continuous rhythm, keep core tight and breathe rhythmically."
    ],
    "keyFormTip": "Maintain continuous rhythm, keep core tight and breathe rhythmically.",
    "driveUrl": "https://drive.google.com/file/d/1-Cwen07cNcrzj3hI67ku1Ha21vljnCgB/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1-Cwen07cNcrzj3hI67ku1Ha21vljnCgB/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "cardio"
    ]
  },
  {
    "id": "16OHcPL5fdc2p_LbdfI9nsvmJi9kqMCbc",
    "fileName": "Stretching - Bridge Pose Setu Bandhasana.mp4",
    "name": "Stretching - Bridge Pose Setu Bandhasana",
    "gender": "MEN",
    "subfolderCategory": "cardio",
    "muscleGroup": "CARDIO",
    "targetMuscles": "Cardiovascular System & Full Body Conditioning",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "45-60s",
    "suggestedRestSeconds": 30,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Bridge Pose Setu Bandhasana.",
      "02 Movement: Perform controlled execution targeting Cardiovascular System & Full Body Conditioning.",
      "03 Form lock: Maintain continuous rhythm, keep core tight and breathe rhythmically."
    ],
    "keyFormTip": "Maintain continuous rhythm, keep core tight and breathe rhythmically.",
    "driveUrl": "https://drive.google.com/file/d/16OHcPL5fdc2p_LbdfI9nsvmJi9kqMCbc/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/16OHcPL5fdc2p_LbdfI9nsvmJi9kqMCbc/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "cardio"
    ]
  },
  {
    "id": "1GwUjIICiA-hYbjonpQljTnDHkgXdZA20",
    "fileName": "Stretching - Flexion Leg Sit-up.mp4",
    "name": "Stretching - Flexion Leg Sit-up",
    "gender": "MEN",
    "subfolderCategory": "cardio",
    "muscleGroup": "CARDIO",
    "targetMuscles": "Cardiovascular System & Full Body Conditioning",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "45-60s",
    "suggestedRestSeconds": 30,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Flexion Leg Sit-up.",
      "02 Movement: Perform controlled execution targeting Cardiovascular System & Full Body Conditioning.",
      "03 Form lock: Maintain continuous rhythm, keep core tight and breathe rhythmically."
    ],
    "keyFormTip": "Maintain continuous rhythm, keep core tight and breathe rhythmically.",
    "driveUrl": "https://drive.google.com/file/d/1GwUjIICiA-hYbjonpQljTnDHkgXdZA20/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1GwUjIICiA-hYbjonpQljTnDHkgXdZA20/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "cardio"
    ]
  },
  {
    "id": "1utHB-uIhf40XNhlmAHGi52chPMudPZNe",
    "fileName": "Stretching - Front Toe Touch.mp4",
    "name": "Stretching - Front Toe Touch",
    "gender": "MEN",
    "subfolderCategory": "cardio",
    "muscleGroup": "CARDIO",
    "targetMuscles": "Cardiovascular System & Full Body Conditioning",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "45-60s",
    "suggestedRestSeconds": 30,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Front Toe Touch.",
      "02 Movement: Perform controlled execution targeting Cardiovascular System & Full Body Conditioning.",
      "03 Form lock: Maintain continuous rhythm, keep core tight and breathe rhythmically."
    ],
    "keyFormTip": "Maintain continuous rhythm, keep core tight and breathe rhythmically.",
    "driveUrl": "https://drive.google.com/file/d/1utHB-uIhf40XNhlmAHGi52chPMudPZNe/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1utHB-uIhf40XNhlmAHGi52chPMudPZNe/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "cardio"
    ]
  },
  {
    "id": "10DVadwxiI6wIk-cv86li_y-PINNHLZ43",
    "fileName": "Stretching - Plyo Side Lunge Stretch.mp4",
    "name": "Stretching - Plyo Side Lunge Stretch",
    "gender": "MEN",
    "subfolderCategory": "cardio",
    "muscleGroup": "CARDIO",
    "targetMuscles": "Cardiovascular System & Full Body Conditioning",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "45-60s",
    "suggestedRestSeconds": 30,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Plyo Side Lunge Stretch.",
      "02 Movement: Perform controlled execution targeting Cardiovascular System & Full Body Conditioning.",
      "03 Form lock: Maintain continuous rhythm, keep core tight and breathe rhythmically."
    ],
    "keyFormTip": "Maintain continuous rhythm, keep core tight and breathe rhythmically.",
    "driveUrl": "https://drive.google.com/file/d/10DVadwxiI6wIk-cv86li_y-PINNHLZ43/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/10DVadwxiI6wIk-cv86li_y-PINNHLZ43/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "cardio"
    ]
  },
  {
    "id": "1EJJccjTl3t3HrsdCjHaYDqiYydCa6dmp",
    "fileName": "Stretching - Single Leg Stretch (bent knee).mp4",
    "name": "Stretching - Single Leg Stretch (bent knee)",
    "gender": "MEN",
    "subfolderCategory": "cardio",
    "muscleGroup": "CARDIO",
    "targetMuscles": "Cardiovascular System & Full Body Conditioning",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "45-60s",
    "suggestedRestSeconds": 30,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Single Leg Stretch (bent knee).",
      "02 Movement: Perform controlled execution targeting Cardiovascular System & Full Body Conditioning.",
      "03 Form lock: Maintain continuous rhythm, keep core tight and breathe rhythmically."
    ],
    "keyFormTip": "Maintain continuous rhythm, keep core tight and breathe rhythmically.",
    "driveUrl": "https://drive.google.com/file/d/1EJJccjTl3t3HrsdCjHaYDqiYydCa6dmp/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1EJJccjTl3t3HrsdCjHaYDqiYydCa6dmp/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "cardio"
    ]
  },
  {
    "id": "1scbZ9sUlEeTf3RoFwyzcYv0rVstrybp9",
    "fileName": "Stretching - Single Straight Leg Stretch.mp4",
    "name": "Stretching - Single Straight Leg Stretch",
    "gender": "MEN",
    "subfolderCategory": "cardio",
    "muscleGroup": "CARDIO",
    "targetMuscles": "Cardiovascular System & Full Body Conditioning",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "45-60s",
    "suggestedRestSeconds": 30,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Single Straight Leg Stretch.",
      "02 Movement: Perform controlled execution targeting Cardiovascular System & Full Body Conditioning.",
      "03 Form lock: Maintain continuous rhythm, keep core tight and breathe rhythmically."
    ],
    "keyFormTip": "Maintain continuous rhythm, keep core tight and breathe rhythmically.",
    "driveUrl": "https://drive.google.com/file/d/1scbZ9sUlEeTf3RoFwyzcYv0rVstrybp9/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1scbZ9sUlEeTf3RoFwyzcYv0rVstrybp9/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "cardio"
    ]
  },
  {
    "id": "1y3z5dBz40dpoa6yoS_3Jyw8QkLFVUgse",
    "fileName": "Treadmill Running.mp4",
    "name": "Treadmill Running",
    "gender": "MEN",
    "subfolderCategory": "cardio",
    "muscleGroup": "CARDIO",
    "targetMuscles": "Cardiovascular System & Full Body Conditioning",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "45-60s",
    "suggestedRestSeconds": 30,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Treadmill Running.",
      "02 Movement: Perform controlled execution targeting Cardiovascular System & Full Body Conditioning.",
      "03 Form lock: Maintain continuous rhythm, keep core tight and breathe rhythmically."
    ],
    "keyFormTip": "Maintain continuous rhythm, keep core tight and breathe rhythmically.",
    "driveUrl": "https://drive.google.com/file/d/1y3z5dBz40dpoa6yoS_3Jyw8QkLFVUgse/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1y3z5dBz40dpoa6yoS_3Jyw8QkLFVUgse/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "cardio"
    ]
  },
  {
    "id": "1he4_xvTdw7hrv2i0aT7qW-rVA09p_Ucy",
    "fileName": "Walk Wave Machine.mp4",
    "name": "Walk Wave Machine",
    "gender": "MEN",
    "subfolderCategory": "cardio",
    "muscleGroup": "CARDIO",
    "targetMuscles": "Cardiovascular System & Full Body Conditioning",
    "equipment": "FULL_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "45-60s",
    "suggestedRestSeconds": 30,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Walk Wave Machine.",
      "02 Movement: Perform controlled execution targeting Cardiovascular System & Full Body Conditioning.",
      "03 Form lock: Maintain continuous rhythm, keep core tight and breathe rhythmically."
    ],
    "keyFormTip": "Maintain continuous rhythm, keep core tight and breathe rhythmically.",
    "driveUrl": "https://drive.google.com/file/d/1he4_xvTdw7hrv2i0aT7qW-rVA09p_Ucy/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1he4_xvTdw7hrv2i0aT7qW-rVA09p_Ucy/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "cardio"
    ]
  },
  {
    "id": "1LvPvt3ACeVVC2jfKCvJovPyrIOOt_uVc",
    "fileName": "Band High Fly.mp4",
    "name": "Band High Fly",
    "gender": "MEN",
    "subfolderCategory": "chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band High Fly.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1LvPvt3ACeVVC2jfKCvJovPyrIOOt_uVc/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1LvPvt3ACeVVC2jfKCvJovPyrIOOt_uVc/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "chest"
    ]
  },
  {
    "id": "1kaA0HvvfgqXv2Ee-bjwz8Y-P4A8ddY9U",
    "fileName": "Barbell Bench Press.mp4",
    "name": "Barbell Bench Press",
    "gender": "MEN",
    "subfolderCategory": "chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Bench Press.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1kaA0HvvfgqXv2Ee-bjwz8Y-P4A8ddY9U/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1kaA0HvvfgqXv2Ee-bjwz8Y-P4A8ddY9U/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "chest"
    ]
  },
  {
    "id": "1PzAuqjJjZMFuh2_jY4kXd5GtfmxBN2Sn",
    "fileName": "Barbell Decline Bench Press.mp4",
    "name": "Barbell Decline Bench Press",
    "gender": "MEN",
    "subfolderCategory": "chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Decline Bench Press.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1PzAuqjJjZMFuh2_jY4kXd5GtfmxBN2Sn/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1PzAuqjJjZMFuh2_jY4kXd5GtfmxBN2Sn/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "chest"
    ]
  },
  {
    "id": "1Z1UOrKUO_4RHrPJu3LjeM9KuW_gGpVBy",
    "fileName": "Barbell Incline Bench Press.mp4",
    "name": "Barbell Incline Bench Press",
    "gender": "MEN",
    "subfolderCategory": "chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Incline Bench Press.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1Z1UOrKUO_4RHrPJu3LjeM9KuW_gGpVBy/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Z1UOrKUO_4RHrPJu3LjeM9KuW_gGpVBy/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "chest"
    ]
  },
  {
    "id": "1kzHdjuny5isKCEnwBgAPiqULlyRVeNfU",
    "fileName": "Cable Lying Fly, Flat Bench Cable Fly.mp4",
    "name": "Cable Lying Fly, Flat Bench Cable Fly",
    "gender": "MEN",
    "subfolderCategory": "chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Lying Fly, Flat Bench Cable Fly.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1kzHdjuny5isKCEnwBgAPiqULlyRVeNfU/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1kzHdjuny5isKCEnwBgAPiqULlyRVeNfU/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "chest"
    ]
  },
  {
    "id": "1_v5_sK5t12C3627zIGje0SpfTR7YjJpP",
    "fileName": "Cable Standing Fly, Crossover fly.mp4",
    "name": "Cable Standing Fly, Crossover fly",
    "gender": "MEN",
    "subfolderCategory": "chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Standing Fly, Crossover fly.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1_v5_sK5t12C3627zIGje0SpfTR7YjJpP/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1_v5_sK5t12C3627zIGje0SpfTR7YjJpP/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "chest"
    ]
  },
  {
    "id": "1pF18SoKx5tnBGKbVELgMUMqlIsYQ2MVR",
    "fileName": "Chest Dips.mp4",
    "name": "Chest Dips",
    "gender": "MEN",
    "subfolderCategory": "chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Chest Dips.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1pF18SoKx5tnBGKbVELgMUMqlIsYQ2MVR/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1pF18SoKx5tnBGKbVELgMUMqlIsYQ2MVR/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "chest"
    ]
  },
  {
    "id": "12ZPek2_49VQIGgc4TmTh0Wur7j5DgJeW",
    "fileName": "Decline Dumbbell Bench Press (45 degree).mp4",
    "name": "Decline Dumbbell Bench Press (45 degree)",
    "gender": "MEN",
    "subfolderCategory": "chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "DUMBBELLS",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Decline Dumbbell Bench Press (45 degree).",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/12ZPek2_49VQIGgc4TmTh0Wur7j5DgJeW/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/12ZPek2_49VQIGgc4TmTh0Wur7j5DgJeW/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "chest"
    ]
  },
  {
    "id": "1RyIm3MKFiVWQT5Sn-juN5R2zYfoxUfG4",
    "fileName": "Deep Push-ups.mp4",
    "name": "Deep Push-ups",
    "gender": "MEN",
    "subfolderCategory": "chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Deep Push-ups.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1RyIm3MKFiVWQT5Sn-juN5R2zYfoxUfG4/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1RyIm3MKFiVWQT5Sn-juN5R2zYfoxUfG4/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "chest"
    ]
  },
  {
    "id": "1W7nqYvkqJEg_CSkTFWq7JOVPmvTPU6Im",
    "fileName": "Dumbbell Bench Press.mp4",
    "name": "Dumbbell Bench Press",
    "gender": "MEN",
    "subfolderCategory": "chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Bench Press.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1W7nqYvkqJEg_CSkTFWq7JOVPmvTPU6Im/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1W7nqYvkqJEg_CSkTFWq7JOVPmvTPU6Im/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "chest"
    ]
  },
  {
    "id": "1Rmzfe7A5TiPfsAlY1pZqsqGIxWbYsffC",
    "fileName": "Dumbbell Decline Fly (45 degree) (1).mp4",
    "name": "Dumbbell Decline Fly (45 degree) (1)",
    "gender": "MEN",
    "subfolderCategory": "chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "DUMBBELLS",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Decline Fly (45 degree) (1).",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1Rmzfe7A5TiPfsAlY1pZqsqGIxWbYsffC/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Rmzfe7A5TiPfsAlY1pZqsqGIxWbYsffC/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "chest"
    ]
  },
  {
    "id": "1YP8txAwyauhaiOAx5MlGvXpc73jN3qGP",
    "fileName": "Dumbbell Decline Fly (45 degree).mp4",
    "name": "Dumbbell Decline Fly (45 degree)",
    "gender": "MEN",
    "subfolderCategory": "chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "DUMBBELLS",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Decline Fly (45 degree).",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1YP8txAwyauhaiOAx5MlGvXpc73jN3qGP/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1YP8txAwyauhaiOAx5MlGvXpc73jN3qGP/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "chest"
    ]
  },
  {
    "id": "12p3ZmSs1IEeOLtFMpTj4CNvZ6_iTlBjA",
    "fileName": "Dumbbell Fly On Exercise Ball.mp4",
    "name": "Dumbbell Fly On Exercise Ball",
    "gender": "MEN",
    "subfolderCategory": "chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Fly On Exercise Ball.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/12p3ZmSs1IEeOLtFMpTj4CNvZ6_iTlBjA/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/12p3ZmSs1IEeOLtFMpTj4CNvZ6_iTlBjA/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "chest"
    ]
  },
  {
    "id": "1RXyHeY3tVVPD-JScSXAPLCYOuffA7LT8",
    "fileName": "Dumbbell Fly.mp4",
    "name": "Dumbbell Fly",
    "gender": "MEN",
    "subfolderCategory": "chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Fly.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1RXyHeY3tVVPD-JScSXAPLCYOuffA7LT8/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1RXyHeY3tVVPD-JScSXAPLCYOuffA7LT8/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "chest"
    ]
  },
  {
    "id": "1F0DxAwiTBJvgnhicBmWmvku3KQrKLOVo",
    "fileName": "Dumbbell Incline Bench Press.mp4",
    "name": "Dumbbell Incline Bench Press",
    "gender": "MEN",
    "subfolderCategory": "chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Incline Bench Press.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1F0DxAwiTBJvgnhicBmWmvku3KQrKLOVo/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1F0DxAwiTBJvgnhicBmWmvku3KQrKLOVo/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "chest"
    ]
  },
  {
    "id": "1_c1z3Qc0PrSMTZXZSoegyBlj3KzD4IlV",
    "fileName": "Dumbbell Incline Fly On Exercise Ball.mp4",
    "name": "Dumbbell Incline Fly On Exercise Ball",
    "gender": "MEN",
    "subfolderCategory": "chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Incline Fly On Exercise Ball.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1_c1z3Qc0PrSMTZXZSoegyBlj3KzD4IlV/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1_c1z3Qc0PrSMTZXZSoegyBlj3KzD4IlV/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "chest"
    ]
  },
  {
    "id": "1sUXVqWaGg5hqP5oNscyxkjeKyy9ZD26m",
    "fileName": "Dumbbell Incline Fly.mp4",
    "name": "Dumbbell Incline Fly",
    "gender": "MEN",
    "subfolderCategory": "chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Incline Fly.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1sUXVqWaGg5hqP5oNscyxkjeKyy9ZD26m/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1sUXVqWaGg5hqP5oNscyxkjeKyy9ZD26m/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "chest"
    ]
  },
  {
    "id": "1ckR7T6Uo82oVU15OqXz95wzEygIQQsGt",
    "fileName": "Dumbbell Lying Hammer Press.mp4",
    "name": "Dumbbell Lying Hammer Press",
    "gender": "MEN",
    "subfolderCategory": "chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Lying Hammer Press.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1ckR7T6Uo82oVU15OqXz95wzEygIQQsGt/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1ckR7T6Uo82oVU15OqXz95wzEygIQQsGt/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "chest"
    ]
  },
  {
    "id": "1Axvrc2b0Fix7Sn4-2kytAFx-m67gSn01",
    "fileName": "Incline Push-Ups.mp4",
    "name": "Incline Push-Ups",
    "gender": "MEN",
    "subfolderCategory": "chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Incline Push-Ups.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1Axvrc2b0Fix7Sn4-2kytAFx-m67gSn01/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Axvrc2b0Fix7Sn4-2kytAFx-m67gSn01/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "chest"
    ]
  },
  {
    "id": "1_97uCCY3MJ6G1uNLq0L_9O69G7xDkSN_",
    "fileName": "Lever Chest Press.mp4",
    "name": "Lever Chest Press",
    "gender": "MEN",
    "subfolderCategory": "chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Chest Press.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1_97uCCY3MJ6G1uNLq0L_9O69G7xDkSN_/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1_97uCCY3MJ6G1uNLq0L_9O69G7xDkSN_/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "chest"
    ]
  },
  {
    "id": "1476DaS5zsDg9B8_x8MfeO578nPfLCvig",
    "fileName": "Lever Incline Hammer Chest Press.mp4",
    "name": "Lever Incline Hammer Chest Press",
    "gender": "MEN",
    "subfolderCategory": "chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Incline Hammer Chest Press.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1476DaS5zsDg9B8_x8MfeO578nPfLCvig/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1476DaS5zsDg9B8_x8MfeO578nPfLCvig/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "chest"
    ]
  },
  {
    "id": "1X_dervXT-K-yhpbJW67zuSPiVsiuowm6",
    "fileName": "Lever Lying Chest Press.mp4",
    "name": "Lever Lying Chest Press",
    "gender": "MEN",
    "subfolderCategory": "chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Lying Chest Press.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1X_dervXT-K-yhpbJW67zuSPiVsiuowm6/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1X_dervXT-K-yhpbJW67zuSPiVsiuowm6/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "chest"
    ]
  },
  {
    "id": "159dB78RpiCwHzn1K9gE5EKjDWgesUxpS",
    "fileName": "Lever Pec Deck Fly.mp4",
    "name": "Lever Pec Deck Fly",
    "gender": "MEN",
    "subfolderCategory": "chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Pec Deck Fly.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/159dB78RpiCwHzn1K9gE5EKjDWgesUxpS/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/159dB78RpiCwHzn1K9gE5EKjDWgesUxpS/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "chest"
    ]
  },
  {
    "id": "1j4NjERH9Jzu1yrPJ6vaCE-ts3HQm43X_",
    "fileName": "Push-ups.mp4",
    "name": "Push-ups",
    "gender": "MEN",
    "subfolderCategory": "chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Push-ups.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1j4NjERH9Jzu1yrPJ6vaCE-ts3HQm43X_/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1j4NjERH9Jzu1yrPJ6vaCE-ts3HQm43X_/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "chest"
    ]
  },
  {
    "id": "1pPERxqoJOmnwojoSseCPImmTwO8SgUJ-",
    "fileName": "Stretching - Above Head Chest Stretch.mp4",
    "name": "Stretching - Above Head Chest Stretch",
    "gender": "MEN",
    "subfolderCategory": "chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Above Head Chest Stretch.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1pPERxqoJOmnwojoSseCPImmTwO8SgUJ-/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1pPERxqoJOmnwojoSseCPImmTwO8SgUJ-/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "chest"
    ]
  },
  {
    "id": "1CSSJ8xvx6eDch8MFUgnSAMMDH8fd9oyb",
    "fileName": "Stretching - Back Pec Stretch.mp4",
    "name": "Stretching - Back Pec Stretch",
    "gender": "MEN",
    "subfolderCategory": "chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Back Pec Stretch.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1CSSJ8xvx6eDch8MFUgnSAMMDH8fd9oyb/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1CSSJ8xvx6eDch8MFUgnSAMMDH8fd9oyb/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "chest"
    ]
  },
  {
    "id": "1NHkDCZhtdm6YIoGntYOi3R42eiygwQWT",
    "fileName": "Stretching - Dynamic Chest Stretch.mp4",
    "name": "Stretching - Dynamic Chest Stretch",
    "gender": "MEN",
    "subfolderCategory": "chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Dynamic Chest Stretch.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1NHkDCZhtdm6YIoGntYOi3R42eiygwQWT/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1NHkDCZhtdm6YIoGntYOi3R42eiygwQWT/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "chest"
    ]
  },
  {
    "id": "1tKfYaX0jQmJAB0_EfpNgyDehFJylgXpN",
    "fileName": "Stretching - Kneeling Back Rotation Stretch.mp4",
    "name": "Stretching - Kneeling Back Rotation Stretch",
    "gender": "MEN",
    "subfolderCategory": "chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Kneeling Back Rotation Stretch.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1tKfYaX0jQmJAB0_EfpNgyDehFJylgXpN/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1tKfYaX0jQmJAB0_EfpNgyDehFJylgXpN/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "chest"
    ]
  },
  {
    "id": "1039_t33oihE28G47Urcu033Nfpj7Ol_n",
    "fileName": "Stretching - Standing Reach Up Back Rotation Stretch.mp4",
    "name": "Stretching - Standing Reach Up Back Rotation Stretch",
    "gender": "MEN",
    "subfolderCategory": "chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Standing Reach Up Back Rotation Stretch.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1039_t33oihE28G47Urcu033Nfpj7Ol_n/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1039_t33oihE28G47Urcu033Nfpj7Ol_n/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "chest"
    ]
  },
  {
    "id": "1t5ALs4_qpIIhDD4hH_01rHxgfmJivtFt",
    "fileName": "Stretching - Standing Wheel Rollout.mp4",
    "name": "Stretching - Standing Wheel Rollout",
    "gender": "MEN",
    "subfolderCategory": "chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Standing Wheel Rollout.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1t5ALs4_qpIIhDD4hH_01rHxgfmJivtFt/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1t5ALs4_qpIIhDD4hH_01rHxgfmJivtFt/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "chest"
    ]
  },
  {
    "id": "1U3NfBFn-e384G_Rj6BIgVscPG_XzHJPl",
    "fileName": "Triceps Dips.mp4",
    "name": "Triceps Dips",
    "gender": "MEN",
    "subfolderCategory": "chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Triceps Dips.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1U3NfBFn-e384G_Rj6BIgVscPG_XzHJPl/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1U3NfBFn-e384G_Rj6BIgVscPG_XzHJPl/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "chest"
    ]
  },
  {
    "id": "1Gz8I4RVKL5jGhk1JQNIXhrhnabmDm-Yz",
    "fileName": "Wide Grip Push-ups.mp4",
    "name": "Wide Grip Push-ups",
    "gender": "MEN",
    "subfolderCategory": "chest",
    "muscleGroup": "CHEST",
    "targetMuscles": "Pectoralis Major & Minor",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "8-12",
    "suggestedRestSeconds": 90,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Wide Grip Push-ups.",
      "02 Movement: Perform controlled execution targeting Pectoralis Major & Minor.",
      "03 Form lock: Retract and depress shoulder blades, control eccentric descent."
    ],
    "keyFormTip": "Retract and depress shoulder blades, control eccentric descent.",
    "driveUrl": "https://drive.google.com/file/d/1Gz8I4RVKL5jGhk1JQNIXhrhnabmDm-Yz/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Gz8I4RVKL5jGhk1JQNIXhrhnabmDm-Yz/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "chest"
    ]
  },
  {
    "id": "1TOQlJdwa3joYqHillrMY-HkM9TGME--r",
    "fileName": "Barbell Reverse Wrist Curl (over-grip).mp4",
    "name": "Barbell Reverse Wrist Curl (over-grip)",
    "gender": "MEN",
    "subfolderCategory": "Forearms",
    "muscleGroup": "ARMS",
    "targetMuscles": "Brachioradialis, Wrist Flexors & Extensors",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Reverse Wrist Curl (over-grip).",
      "02 Movement: Perform controlled execution targeting Brachioradialis, Wrist Flexors & Extensors.",
      "03 Form lock: Control both flexion and extension without swinging momentum."
    ],
    "keyFormTip": "Control both flexion and extension without swinging momentum.",
    "driveUrl": "https://drive.google.com/file/d/1TOQlJdwa3joYqHillrMY-HkM9TGME--r/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1TOQlJdwa3joYqHillrMY-HkM9TGME--r/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Forearms"
    ]
  },
  {
    "id": "1sKIEsAvIZWwGhjvwtLO97nsy0w48xqeW",
    "fileName": "Barbell Standing Back Wrist Curl.mp4",
    "name": "Barbell Standing Back Wrist Curl",
    "gender": "MEN",
    "subfolderCategory": "Forearms",
    "muscleGroup": "ARMS",
    "targetMuscles": "Brachioradialis, Wrist Flexors & Extensors",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Standing Back Wrist Curl.",
      "02 Movement: Perform controlled execution targeting Brachioradialis, Wrist Flexors & Extensors.",
      "03 Form lock: Control both flexion and extension without swinging momentum."
    ],
    "keyFormTip": "Control both flexion and extension without swinging momentum.",
    "driveUrl": "https://drive.google.com/file/d/1sKIEsAvIZWwGhjvwtLO97nsy0w48xqeW/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1sKIEsAvIZWwGhjvwtLO97nsy0w48xqeW/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Forearms"
    ]
  },
  {
    "id": "1GXXcDre39iOm-XcjQGzB231RSzPNhIjs",
    "fileName": "Dumbbell Behind Back Wrist Curl.mp4",
    "name": "Dumbbell Behind Back Wrist Curl",
    "gender": "MEN",
    "subfolderCategory": "Forearms",
    "muscleGroup": "ARMS",
    "targetMuscles": "Brachioradialis, Wrist Flexors & Extensors",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Behind Back Wrist Curl.",
      "02 Movement: Perform controlled execution targeting Brachioradialis, Wrist Flexors & Extensors.",
      "03 Form lock: Control both flexion and extension without swinging momentum."
    ],
    "keyFormTip": "Control both flexion and extension without swinging momentum.",
    "driveUrl": "https://drive.google.com/file/d/1GXXcDre39iOm-XcjQGzB231RSzPNhIjs/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1GXXcDre39iOm-XcjQGzB231RSzPNhIjs/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Forearms"
    ]
  },
  {
    "id": "1z-i6gL1dgMknwc1oJQZhBtYUG4r-jh8Q",
    "fileName": "Dumbbell Over Bench Wrist Curl.mp4",
    "name": "Dumbbell Over Bench Wrist Curl",
    "gender": "MEN",
    "subfolderCategory": "Forearms",
    "muscleGroup": "ARMS",
    "targetMuscles": "Brachioradialis, Wrist Flexors & Extensors",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Over Bench Wrist Curl.",
      "02 Movement: Perform controlled execution targeting Brachioradialis, Wrist Flexors & Extensors.",
      "03 Form lock: Control both flexion and extension without swinging momentum."
    ],
    "keyFormTip": "Control both flexion and extension without swinging momentum.",
    "driveUrl": "https://drive.google.com/file/d/1z-i6gL1dgMknwc1oJQZhBtYUG4r-jh8Q/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1z-i6gL1dgMknwc1oJQZhBtYUG4r-jh8Q/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Forearms"
    ]
  },
  {
    "id": "1qzPcvd3o-LVp74rDNVbBzfRNp5mNsgga",
    "fileName": "Dumbbell Seated Neutral Wrist Curl.mp4",
    "name": "Dumbbell Seated Neutral Wrist Curl",
    "gender": "MEN",
    "subfolderCategory": "Forearms",
    "muscleGroup": "ARMS",
    "targetMuscles": "Brachioradialis, Wrist Flexors & Extensors",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Seated Neutral Wrist Curl.",
      "02 Movement: Perform controlled execution targeting Brachioradialis, Wrist Flexors & Extensors.",
      "03 Form lock: Control both flexion and extension without swinging momentum."
    ],
    "keyFormTip": "Control both flexion and extension without swinging momentum.",
    "driveUrl": "https://drive.google.com/file/d/1qzPcvd3o-LVp74rDNVbBzfRNp5mNsgga/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1qzPcvd3o-LVp74rDNVbBzfRNp5mNsgga/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Forearms"
    ]
  },
  {
    "id": "1wqcb2MDzWF2Qz4Pjw2jrhvaixWgo5Tbi",
    "fileName": "Stretching - Side Wrist Pull Stretch.mp4",
    "name": "Stretching - Side Wrist Pull Stretch",
    "gender": "MEN",
    "subfolderCategory": "Forearms",
    "muscleGroup": "ARMS",
    "targetMuscles": "Brachioradialis, Wrist Flexors & Extensors",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Side Wrist Pull Stretch.",
      "02 Movement: Perform controlled execution targeting Brachioradialis, Wrist Flexors & Extensors.",
      "03 Form lock: Control both flexion and extension without swinging momentum."
    ],
    "keyFormTip": "Control both flexion and extension without swinging momentum.",
    "driveUrl": "https://drive.google.com/file/d/1wqcb2MDzWF2Qz4Pjw2jrhvaixWgo5Tbi/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1wqcb2MDzWF2Qz4Pjw2jrhvaixWgo5Tbi/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Forearms"
    ]
  },
  {
    "id": "1O-dsbcvaCmF4ZK3Fl3R419NHDthBrBrS",
    "fileName": "Stretching - Wrist Circles.mp4",
    "name": "Stretching - Wrist Circles",
    "gender": "MEN",
    "subfolderCategory": "Forearms",
    "muscleGroup": "ARMS",
    "targetMuscles": "Brachioradialis, Wrist Flexors & Extensors",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Wrist Circles.",
      "02 Movement: Perform controlled execution targeting Brachioradialis, Wrist Flexors & Extensors.",
      "03 Form lock: Control both flexion and extension without swinging momentum."
    ],
    "keyFormTip": "Control both flexion and extension without swinging momentum.",
    "driveUrl": "https://drive.google.com/file/d/1O-dsbcvaCmF4ZK3Fl3R419NHDthBrBrS/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1O-dsbcvaCmF4ZK3Fl3R419NHDthBrBrS/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Forearms"
    ]
  },
  {
    "id": "1WC_ZTa-4av5ODIDNbkkVoKWoT4QpjmMG",
    "fileName": "Weighted Standing Curl.mp4",
    "name": "Weighted Standing Curl",
    "gender": "MEN",
    "subfolderCategory": "Forearms",
    "muscleGroup": "ARMS",
    "targetMuscles": "Brachioradialis, Wrist Flexors & Extensors",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "15-20",
    "suggestedRestSeconds": 45,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Weighted Standing Curl.",
      "02 Movement: Perform controlled execution targeting Brachioradialis, Wrist Flexors & Extensors.",
      "03 Form lock: Control both flexion and extension without swinging momentum."
    ],
    "keyFormTip": "Control both flexion and extension without swinging momentum.",
    "driveUrl": "https://drive.google.com/file/d/1WC_ZTa-4av5ODIDNbkkVoKWoT4QpjmMG/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1WC_ZTa-4av5ODIDNbkkVoKWoT4QpjmMG/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Forearms"
    ]
  },
  {
    "id": "1Wl87KbEuZJ8nOAoVfMuzcRCXzRGplN8d",
    "fileName": "Band Bent Over Hip Extension.mp4",
    "name": "Band Bent Over Hip Extension",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Bent Over Hip Extension.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1Wl87KbEuZJ8nOAoVfMuzcRCXzRGplN8d/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Wl87KbEuZJ8nOAoVfMuzcRCXzRGplN8d/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "18KXem4CaiPzsmCPqk-Tlp2PiLZ-OEMwB",
    "fileName": "Band Hip Abduction.mp4",
    "name": "Band Hip Abduction",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Hip Abduction.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/18KXem4CaiPzsmCPqk-Tlp2PiLZ-OEMwB/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/18KXem4CaiPzsmCPqk-Tlp2PiLZ-OEMwB/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1ulKoZrQE-G3WVT88CR7-eIF6FjB38ml_",
    "fileName": "Band Hip Adduction.mp4",
    "name": "Band Hip Adduction",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Hip Adduction.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1ulKoZrQE-G3WVT88CR7-eIF6FjB38ml_/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1ulKoZrQE-G3WVT88CR7-eIF6FjB38ml_/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1WUMcTZS7p34uRE5OqWMlvR7y29B7AkgZ",
    "fileName": "Band Leg Curl.mp4",
    "name": "Band Leg Curl",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Leg Curl.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1WUMcTZS7p34uRE5OqWMlvR7y29B7AkgZ/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1WUMcTZS7p34uRE5OqWMlvR7y29B7AkgZ/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1SI_pWaepSBEPiew9qp3xQM-P83oTVsft",
    "fileName": "Band Seated Leg Extension.mp4",
    "name": "Band Seated Leg Extension",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Seated Leg Extension.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1SI_pWaepSBEPiew9qp3xQM-P83oTVsft/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1SI_pWaepSBEPiew9qp3xQM-P83oTVsft/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1rKAZcYMe0kOzhd-KYrtRefdrXM5tItqY",
    "fileName": "Band Standing Hip Extension.mp4",
    "name": "Band Standing Hip Extension",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Standing Hip Extension.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1rKAZcYMe0kOzhd-KYrtRefdrXM5tItqY/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1rKAZcYMe0kOzhd-KYrtRefdrXM5tItqY/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1LpZPUgvV9AYJXuwaVkyix6wdCLSm6RRG",
    "fileName": "Band Standing Leg Curl.mp4",
    "name": "Band Standing Leg Curl",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Standing Leg Curl.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1LpZPUgvV9AYJXuwaVkyix6wdCLSm6RRG/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1LpZPUgvV9AYJXuwaVkyix6wdCLSm6RRG/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1pZbt7RJ13WAYUfXyfwxqhPWKh01AlF4a",
    "fileName": "Barbell Clean And Press.mp4",
    "name": "Barbell Clean And Press",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Clean And Press.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1pZbt7RJ13WAYUfXyfwxqhPWKh01AlF4a/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1pZbt7RJ13WAYUfXyfwxqhPWKh01AlF4a/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1A_x28AFCtKuhTWefSk_xEeYX5gYeE8YV",
    "fileName": "Barbell Front Chest Squat.mp4",
    "name": "Barbell Front Chest Squat",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Front Chest Squat.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1A_x28AFCtKuhTWefSk_xEeYX5gYeE8YV/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1A_x28AFCtKuhTWefSk_xEeYX5gYeE8YV/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1zGhWHjo94EjxMAUXWkzu7_eiVIunp4n_",
    "fileName": "Barbell Lunge.mp4",
    "name": "Barbell Lunge",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Lunge.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1zGhWHjo94EjxMAUXWkzu7_eiVIunp4n_/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1zGhWHjo94EjxMAUXWkzu7_eiVIunp4n_/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1H79W8cMjUCQLuMffANvNqw_2h151vbZN",
    "fileName": "Classic Barbell Squat.mp4",
    "name": "Classic Barbell Squat",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Classic Barbell Squat.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1H79W8cMjUCQLuMffANvNqw_2h151vbZN/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1H79W8cMjUCQLuMffANvNqw_2h151vbZN/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "14gkJMn2-sxCAW4u06ZeZO8WP4k6EHwT_",
    "fileName": "Close Feet Leg Press.mp4",
    "name": "Close Feet Leg Press",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Close Feet Leg Press.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/14gkJMn2-sxCAW4u06ZeZO8WP4k6EHwT_/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/14gkJMn2-sxCAW4u06ZeZO8WP4k6EHwT_/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1kzgl518nwnhIBcpaOA9x9MhvfleSXMP4",
    "fileName": "Dumbbell Bar Grip Sumo Squat.mp4",
    "name": "Dumbbell Bar Grip Sumo Squat",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Bar Grip Sumo Squat.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1kzgl518nwnhIBcpaOA9x9MhvfleSXMP4/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1kzgl518nwnhIBcpaOA9x9MhvfleSXMP4/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1CEMGtZuxOlEZ0cm3bEBiqScrNBzrrfPE",
    "fileName": "Dumbbell Front Squat.mp4",
    "name": "Dumbbell Front Squat",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Front Squat.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1CEMGtZuxOlEZ0cm3bEBiqScrNBzrrfPE/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1CEMGtZuxOlEZ0cm3bEBiqScrNBzrrfPE/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1nJGicENUJtij02fnBOKTOtWjAqUfh7zN",
    "fileName": "Dumbbell Goblet Squat.mp4",
    "name": "Dumbbell Goblet Squat",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Goblet Squat.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1nJGicENUJtij02fnBOKTOtWjAqUfh7zN/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1nJGicENUJtij02fnBOKTOtWjAqUfh7zN/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1zunpkS077GaHRiRsaF1xu0_Cz8mXz3eU",
    "fileName": "Dumbbell Lunge.mp4",
    "name": "Dumbbell Lunge",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Lunge.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1zunpkS077GaHRiRsaF1xu0_Cz8mXz3eU/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1zunpkS077GaHRiRsaF1xu0_Cz8mXz3eU/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1SJ7N4tEy7-dn1EmyD0J5s8z0SW-jqK-0",
    "fileName": "Dumbbell Lying Femoral.mp4",
    "name": "Dumbbell Lying Femoral",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Lying Femoral.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1SJ7N4tEy7-dn1EmyD0J5s8z0SW-jqK-0/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1SJ7N4tEy7-dn1EmyD0J5s8z0SW-jqK-0/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1LveA1rHz2IpHbG_hOUVERYNk739wQrtP",
    "fileName": "Dumbbell Single Leg Squat.mp4",
    "name": "Dumbbell Single Leg Squat",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Single Leg Squat.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1LveA1rHz2IpHbG_hOUVERYNk739wQrtP/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1LveA1rHz2IpHbG_hOUVERYNk739wQrtP/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1buC2DPo9uZyYEqVM7d6n2Z2PhjUjrJRE",
    "fileName": "Dumbbell Squat.mp4",
    "name": "Dumbbell Squat",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Squat.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1buC2DPo9uZyYEqVM7d6n2Z2PhjUjrJRE/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1buC2DPo9uZyYEqVM7d6n2Z2PhjUjrJRE/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1LigK2po9IO8_XzYVQRFCeDAHhAmZG5Cl",
    "fileName": "Lever Horizontal Leg Press.mp4",
    "name": "Lever Horizontal Leg Press",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Horizontal Leg Press.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1LigK2po9IO8_XzYVQRFCeDAHhAmZG5Cl/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1LigK2po9IO8_XzYVQRFCeDAHhAmZG5Cl/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1vR25HBGbmbgKGIy_4VpXoTg-O5joqLfB",
    "fileName": "Lever Kneeling Leg Curl.mp4",
    "name": "Lever Kneeling Leg Curl",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Kneeling Leg Curl.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1vR25HBGbmbgKGIy_4VpXoTg-O5joqLfB/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1vR25HBGbmbgKGIy_4VpXoTg-O5joqLfB/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1ecG_dTcn1TokxcCHTmNkVlfo0hTvgjBQ",
    "fileName": "Lever Leg Extension.mp4",
    "name": "Lever Leg Extension",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Leg Extension.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1ecG_dTcn1TokxcCHTmNkVlfo0hTvgjBQ/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1ecG_dTcn1TokxcCHTmNkVlfo0hTvgjBQ/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1xZJpxPqJ78ZCaTab0K1MrC5MArQJlIFi",
    "fileName": "Lever Lying Leg Curl.mp4",
    "name": "Lever Lying Leg Curl",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Lying Leg Curl.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1xZJpxPqJ78ZCaTab0K1MrC5MArQJlIFi/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1xZJpxPqJ78ZCaTab0K1MrC5MArQJlIFi/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1e8hKBld0MJw2Xl05lojCcFt4lhDGgL4Z",
    "fileName": "Lever Seated Hip Abduction.mp4",
    "name": "Lever Seated Hip Abduction",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Seated Hip Abduction.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1e8hKBld0MJw2Xl05lojCcFt4lhDGgL4Z/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1e8hKBld0MJw2Xl05lojCcFt4lhDGgL4Z/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1EiXLMTxPqrP6F4ePWSNmQvma7ZPUPG-U",
    "fileName": "Lever Seated Hip Adduction.mp4",
    "name": "Lever Seated Hip Adduction",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Seated Hip Adduction.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1EiXLMTxPqrP6F4ePWSNmQvma7ZPUPG-U/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1EiXLMTxPqrP6F4ePWSNmQvma7ZPUPG-U/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1Uvfj5F2jNTJawaDBfTrB0l1MGxzmuqOD",
    "fileName": "Lever Seated Leg Curl.mp4",
    "name": "Lever Seated Leg Curl",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Seated Leg Curl.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1Uvfj5F2jNTJawaDBfTrB0l1MGxzmuqOD/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Uvfj5F2jNTJawaDBfTrB0l1MGxzmuqOD/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1RLYGxmefmqjt0AS93pQBLdoXSAuZe3NN",
    "fileName": "Lever Standing Hip Extension.mp4",
    "name": "Lever Standing Hip Extension",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Standing Hip Extension.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1RLYGxmefmqjt0AS93pQBLdoXSAuZe3NN/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1RLYGxmefmqjt0AS93pQBLdoXSAuZe3NN/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1zlGn_LS1sU9ETC9PKzEXONFpIRYKI7PM",
    "fileName": "Lever Standing Rear Kick.mp4",
    "name": "Lever Standing Rear Kick",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Standing Rear Kick.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1zlGn_LS1sU9ETC9PKzEXONFpIRYKI7PM/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1zlGn_LS1sU9ETC9PKzEXONFpIRYKI7PM/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1Jez08fqUxuz0W7LYm4kM184vJt8ofW7t",
    "fileName": "Rear Decline Bridge.mp4",
    "name": "Rear Decline Bridge",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Rear Decline Bridge.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1Jez08fqUxuz0W7LYm4kM184vJt8ofW7t/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Jez08fqUxuz0W7LYm4kM184vJt8ofW7t/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1mDaRA27wO72-8pSGKQdfFn5OD4IJBAoK",
    "fileName": "Sled 45 Degree Leg Wide Press.mp4",
    "name": "Sled 45 Degree Leg Wide Press",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Sled 45 Degree Leg Wide Press.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1mDaRA27wO72-8pSGKQdfFn5OD4IJBAoK/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1mDaRA27wO72-8pSGKQdfFn5OD4IJBAoK/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "18yxyS0p6N-JS0KOPAog0WBtT6RD5Kv5q",
    "fileName": "Sled Hack Squat.mp4",
    "name": "Sled Hack Squat",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Sled Hack Squat.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/18yxyS0p6N-JS0KOPAog0WBtT6RD5Kv5q/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/18yxyS0p6N-JS0KOPAog0WBtT6RD5Kv5q/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1H51CougHIZH75wZhWxyMac3B-IwS9ZL8",
    "fileName": "Smith Chair Squat.mp4",
    "name": "Smith Chair Squat",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Smith Chair Squat.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1H51CougHIZH75wZhWxyMac3B-IwS9ZL8/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1H51CougHIZH75wZhWxyMac3B-IwS9ZL8/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "12jK0NZczlFhtHN1vh2ZoOTDVl-N4WkiM",
    "fileName": "Smith Leg Press.mp4",
    "name": "Smith Leg Press",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Smith Leg Press.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/12jK0NZczlFhtHN1vh2ZoOTDVl-N4WkiM/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/12jK0NZczlFhtHN1vh2ZoOTDVl-N4WkiM/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "160GMifvoM1I4Vnsjfvmn5JI0YRdQv357",
    "fileName": "Squat.mp4",
    "name": "Squat",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Squat.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/160GMifvoM1I4Vnsjfvmn5JI0YRdQv357/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/160GMifvoM1I4Vnsjfvmn5JI0YRdQv357/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1S4yZied63l_cpWNiDULSi_iBvpwtg4CL",
    "fileName": "Stretching - Adductor stretch.mp4",
    "name": "Stretching - Adductor stretch",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Adductor stretch.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1S4yZied63l_cpWNiDULSi_iBvpwtg4CL/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1S4yZied63l_cpWNiDULSi_iBvpwtg4CL/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1Xc7hpG-MKbkwLyjZPPLu_iQNMKaoAbpB",
    "fileName": "Stretching - All Fours Squad Stretch.mp4",
    "name": "Stretching - All Fours Squad Stretch",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - All Fours Squad Stretch.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1Xc7hpG-MKbkwLyjZPPLu_iQNMKaoAbpB/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Xc7hpG-MKbkwLyjZPPLu_iQNMKaoAbpB/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1Pj58gcyVOfUztmVIAoaFCnfCiwU5rE6C",
    "fileName": "Stretching - Boat Stretch.mp4",
    "name": "Stretching - Boat Stretch",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Boat Stretch.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1Pj58gcyVOfUztmVIAoaFCnfCiwU5rE6C/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Pj58gcyVOfUztmVIAoaFCnfCiwU5rE6C/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1dcWRcM3oVdk5UnP6DO7l2MPyZwmoBCOx",
    "fileName": "Stretching - Ceiling Look Stretch.mp4",
    "name": "Stretching - Ceiling Look Stretch",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Ceiling Look Stretch.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1dcWRcM3oVdk5UnP6DO7l2MPyZwmoBCOx/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1dcWRcM3oVdk5UnP6DO7l2MPyZwmoBCOx/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1wpaD6GAfZDx8tDw6LLo1J7u3VDeAhu7U",
    "fileName": "Stretching - Crossover Kneeling Hip Flexor Stretch.mp4",
    "name": "Stretching - Crossover Kneeling Hip Flexor Stretch",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Crossover Kneeling Hip Flexor Stretch.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1wpaD6GAfZDx8tDw6LLo1J7u3VDeAhu7U/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1wpaD6GAfZDx8tDw6LLo1J7u3VDeAhu7U/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1Aik_3HOhfMc9wnO9fRv1npyvGvJ0qwbw",
    "fileName": "Stretching - Hamstring Stretch.mp4",
    "name": "Stretching - Hamstring Stretch",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Hamstring Stretch.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1Aik_3HOhfMc9wnO9fRv1npyvGvJ0qwbw/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Aik_3HOhfMc9wnO9fRv1npyvGvJ0qwbw/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1Q3JYw-JdF5GnOts8iNle9r1tML_uj-uK",
    "fileName": "Stretching - Hip Circles Stretch.mp4",
    "name": "Stretching - Hip Circles Stretch",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Hip Circles Stretch.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1Q3JYw-JdF5GnOts8iNle9r1tML_uj-uK/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Q3JYw-JdF5GnOts8iNle9r1tML_uj-uK/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1wb1Utf_4UFQuJym06Xajt0R80xmXabqZ",
    "fileName": "Stretching - Hip Extension Stretch.mp4",
    "name": "Stretching - Hip Extension Stretch",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Hip Extension Stretch.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1wb1Utf_4UFQuJym06Xajt0R80xmXabqZ/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1wb1Utf_4UFQuJym06Xajt0R80xmXabqZ/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1B_8tYNsPPDRh1Tlvwv5FO_j_NbTbQ2Dy",
    "fileName": "Stretching - Hip Flexor and Quad Stretch.mp4",
    "name": "Stretching - Hip Flexor and Quad Stretch",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Hip Flexor and Quad Stretch.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1B_8tYNsPPDRh1Tlvwv5FO_j_NbTbQ2Dy/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1B_8tYNsPPDRh1Tlvwv5FO_j_NbTbQ2Dy/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1GZe_Nw3l7WX2nSYINhMlX0jDbBV7_uKq",
    "fileName": "Stretching - Hip Flexor Stretch Rear foot elevated.mp4",
    "name": "Stretching - Hip Flexor Stretch Rear foot elevated",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Hip Flexor Stretch Rear foot elevated.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1GZe_Nw3l7WX2nSYINhMlX0jDbBV7_uKq/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1GZe_Nw3l7WX2nSYINhMlX0jDbBV7_uKq/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1TmsVeF85ESi81EAxRRKwWccU3O5wLpY5",
    "fileName": "Stretching - Knee Raise.mp4",
    "name": "Stretching - Knee Raise",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Knee Raise.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1TmsVeF85ESi81EAxRRKwWccU3O5wLpY5/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1TmsVeF85ESi81EAxRRKwWccU3O5wLpY5/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1N89UgpE4FcuFXijXuYf5o2THkxs37AtQ",
    "fileName": "Stretching - Quadriceps lying stretch.mp4",
    "name": "Stretching - Quadriceps lying stretch",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Quadriceps lying stretch.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1N89UgpE4FcuFXijXuYf5o2THkxs37AtQ/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1N89UgpE4FcuFXijXuYf5o2THkxs37AtQ/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1i38tOSpbPc5co6aq_iA3ECGYD10ouJc0",
    "fileName": "Stretching - Quadriceps stretch.mp4",
    "name": "Stretching - Quadriceps stretch",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Quadriceps stretch.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1i38tOSpbPc5co6aq_iA3ECGYD10ouJc0/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1i38tOSpbPc5co6aq_iA3ECGYD10ouJc0/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1p6KlN13ACu2wuMTVKjNpjkgAsmMKd3KF",
    "fileName": "Stretching - Runners Stretch.mp4",
    "name": "Stretching - Runners Stretch",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Runners Stretch.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/1p6KlN13ACu2wuMTVKjNpjkgAsmMKd3KF/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1p6KlN13ACu2wuMTVKjNpjkgAsmMKd3KF/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "12o7e8wJkBs6EpUsxCW-KDQ9qtGcgjDK5",
    "fileName": "Weighted Sissy Squat.mp4",
    "name": "Weighted Sissy Squat",
    "gender": "MEN",
    "subfolderCategory": "Hips",
    "muscleGroup": "LEGS",
    "targetMuscles": "Gluteus Maximus, Medius & Hamstrings",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 75,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Weighted Sissy Squat.",
      "02 Movement: Perform controlled execution targeting Gluteus Maximus, Medius & Hamstrings.",
      "03 Form lock: Hinge at the hips, maintain neutral spine, squeeze glutes at lockout."
    ],
    "keyFormTip": "Hinge at the hips, maintain neutral spine, squeeze glutes at lockout.",
    "driveUrl": "https://drive.google.com/file/d/12o7e8wJkBs6EpUsxCW-KDQ9qtGcgjDK5/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/12o7e8wJkBs6EpUsxCW-KDQ9qtGcgjDK5/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Hips"
    ]
  },
  {
    "id": "1C-N4TmpNj2INAPKRtG63L2sj8NtBcPCP",
    "fileName": "Band Bent-over Rear Lateral Raise.mp4",
    "name": "Band Bent-over Rear Lateral Raise",
    "gender": "MEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Bent-over Rear Lateral Raise.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1C-N4TmpNj2INAPKRtG63L2sj8NtBcPCP/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1C-N4TmpNj2INAPKRtG63L2sj8NtBcPCP/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Shoulders"
    ]
  },
  {
    "id": "1sgjwuEdkpFVs185uHmklF-hHlYaIbUgx",
    "fileName": "Band One Arm Forward Raise.mp4",
    "name": "Band One Arm Forward Raise",
    "gender": "MEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band One Arm Forward Raise.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1sgjwuEdkpFVs185uHmklF-hHlYaIbUgx/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1sgjwuEdkpFVs185uHmklF-hHlYaIbUgx/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Shoulders"
    ]
  },
  {
    "id": "1uIKsn2WgXvLNHsTxB6cJ9drVubV3SnlC",
    "fileName": "Band Standing Rear Delt Row.mp4",
    "name": "Band Standing Rear Delt Row",
    "gender": "MEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "FULL_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Standing Rear Delt Row.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1uIKsn2WgXvLNHsTxB6cJ9drVubV3SnlC/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1uIKsn2WgXvLNHsTxB6cJ9drVubV3SnlC/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Shoulders"
    ]
  },
  {
    "id": "1r6cEOA3lv6sokGyY0V4ZI4lg9OJZfzH2",
    "fileName": "Barbell Front Raise.mp4",
    "name": "Barbell Front Raise",
    "gender": "MEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Front Raise.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1r6cEOA3lv6sokGyY0V4ZI4lg9OJZfzH2/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1r6cEOA3lv6sokGyY0V4ZI4lg9OJZfzH2/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Shoulders"
    ]
  },
  {
    "id": "1qNcXUu59Ylj3tS1GaBB9V2GuVrk_y3d_",
    "fileName": "Barbell Seated Behind Head Military Press.mp4",
    "name": "Barbell Seated Behind Head Military Press",
    "gender": "MEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Seated Behind Head Military Press.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1qNcXUu59Ylj3tS1GaBB9V2GuVrk_y3d_/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1qNcXUu59Ylj3tS1GaBB9V2GuVrk_y3d_/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Shoulders"
    ]
  },
  {
    "id": "1KnjWku3yNZnSeZTt3a8A2UfQDTiVthFQ",
    "fileName": "Barbell Upright Row (wide-grip).mp4",
    "name": "Barbell Upright Row (wide-grip)",
    "gender": "MEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Upright Row (wide-grip).",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1KnjWku3yNZnSeZTt3a8A2UfQDTiVthFQ/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1KnjWku3yNZnSeZTt3a8A2UfQDTiVthFQ/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Shoulders"
    ]
  },
  {
    "id": "1UPtyQFMK5CFsigAeJiNDxBeQsDSR-tgo",
    "fileName": "Cable Crossover Reverse Fly.mp4",
    "name": "Cable Crossover Reverse Fly",
    "gender": "MEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Crossover Reverse Fly.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1UPtyQFMK5CFsigAeJiNDxBeQsDSR-tgo/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1UPtyQFMK5CFsigAeJiNDxBeQsDSR-tgo/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Shoulders"
    ]
  },
  {
    "id": "1Vc459lRENQTyio6eMe5aPPvbWvyEErcV",
    "fileName": "Cable Front Raise.mp4",
    "name": "Cable Front Raise",
    "gender": "MEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Front Raise.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1Vc459lRENQTyio6eMe5aPPvbWvyEErcV/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Vc459lRENQTyio6eMe5aPPvbWvyEErcV/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Shoulders"
    ]
  },
  {
    "id": "1DDRqJDeGP2h14IBawaQwjNi2pi0kck_2",
    "fileName": "Cable Lateral Raise.mp4",
    "name": "Cable Lateral Raise",
    "gender": "MEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Lateral Raise.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1DDRqJDeGP2h14IBawaQwjNi2pi0kck_2/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1DDRqJDeGP2h14IBawaQwjNi2pi0kck_2/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Shoulders"
    ]
  },
  {
    "id": "1XVv8PGW4RUlEV1e8XyvfUS39FPab8roO",
    "fileName": "Cable One Arm Forward Raise.mp4",
    "name": "Cable One Arm Forward Raise",
    "gender": "MEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable One Arm Forward Raise.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1XVv8PGW4RUlEV1e8XyvfUS39FPab8roO/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1XVv8PGW4RUlEV1e8XyvfUS39FPab8roO/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Shoulders"
    ]
  },
  {
    "id": "15MEh63-unbPvOPJ1eZClyv8LLTxgSGdp",
    "fileName": "Cable One Arm Lateral Raise.mp4",
    "name": "Cable One Arm Lateral Raise",
    "gender": "MEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable One Arm Lateral Raise.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/15MEh63-unbPvOPJ1eZClyv8LLTxgSGdp/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/15MEh63-unbPvOPJ1eZClyv8LLTxgSGdp/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Shoulders"
    ]
  },
  {
    "id": "1zuL6t9w7xGFW-hrhUx3KTNbNmcgCfC7n",
    "fileName": "Cable Rear Delt Row (with rope).mp4",
    "name": "Cable Rear Delt Row (with rope)",
    "gender": "MEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Rear Delt Row (with rope).",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1zuL6t9w7xGFW-hrhUx3KTNbNmcgCfC7n/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1zuL6t9w7xGFW-hrhUx3KTNbNmcgCfC7n/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Shoulders"
    ]
  },
  {
    "id": "1-I_jMgu_qZRQNt4wrphCiq7x4XLCfVfd",
    "fileName": "Dumbbell Alternate Shoulder Press.mp4",
    "name": "Dumbbell Alternate Shoulder Press",
    "gender": "MEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Alternate Shoulder Press.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1-I_jMgu_qZRQNt4wrphCiq7x4XLCfVfd/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1-I_jMgu_qZRQNt4wrphCiq7x4XLCfVfd/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Shoulders"
    ]
  },
  {
    "id": "1gkTzeUkwQZAK0-ggnGhUwv1BL4vLUNA7",
    "fileName": "Dumbbell Arnold Press.mp4",
    "name": "Dumbbell Arnold Press",
    "gender": "MEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Arnold Press.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1gkTzeUkwQZAK0-ggnGhUwv1BL4vLUNA7/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1gkTzeUkwQZAK0-ggnGhUwv1BL4vLUNA7/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Shoulders"
    ]
  },
  {
    "id": "1QKSMuaAIk2oQhkirToISaFootPoUOEkF",
    "fileName": "Dumbbell Bench Seated Press.mp4",
    "name": "Dumbbell Bench Seated Press",
    "gender": "MEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Bench Seated Press.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1QKSMuaAIk2oQhkirToISaFootPoUOEkF/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1QKSMuaAIk2oQhkirToISaFootPoUOEkF/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Shoulders"
    ]
  },
  {
    "id": "1MOvItZ-ggZ44kkJADIqMEDhJPitDEhov",
    "fileName": "Dumbbell Front Raise.mp4",
    "name": "Dumbbell Front Raise",
    "gender": "MEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Front Raise.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1MOvItZ-ggZ44kkJADIqMEDhJPitDEhov/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1MOvItZ-ggZ44kkJADIqMEDhJPitDEhov/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Shoulders"
    ]
  },
  {
    "id": "1HDpXD9TNIwOhiZiFGUjXxQhxIqI7dgKj",
    "fileName": "Dumbbell Incline Hammer Press.mp4",
    "name": "Dumbbell Incline Hammer Press",
    "gender": "MEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Incline Hammer Press.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1HDpXD9TNIwOhiZiFGUjXxQhxIqI7dgKj/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1HDpXD9TNIwOhiZiFGUjXxQhxIqI7dgKj/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Shoulders"
    ]
  },
  {
    "id": "1PZ0fbY_UCxBNGzvLyzwBWVoDQ44FDvpa",
    "fileName": "Dumbbell Incline Rear Lateral Raise.mp4",
    "name": "Dumbbell Incline Rear Lateral Raise",
    "gender": "MEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Incline Rear Lateral Raise.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1PZ0fbY_UCxBNGzvLyzwBWVoDQ44FDvpa/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1PZ0fbY_UCxBNGzvLyzwBWVoDQ44FDvpa/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Shoulders"
    ]
  },
  {
    "id": "14elBOBwCf9Pc49r3XQ-vw1oKixZUsIy6",
    "fileName": "Dumbbell Iron Cross.mp4",
    "name": "Dumbbell Iron Cross",
    "gender": "MEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Iron Cross.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/14elBOBwCf9Pc49r3XQ-vw1oKixZUsIy6/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/14elBOBwCf9Pc49r3XQ-vw1oKixZUsIy6/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Shoulders"
    ]
  },
  {
    "id": "1syQu6vAbUGdSVRnaSlmXFUbwzn0tvMIt",
    "fileName": "Dumbbell Lateral Raise.mp4",
    "name": "Dumbbell Lateral Raise",
    "gender": "MEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Lateral Raise.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1syQu6vAbUGdSVRnaSlmXFUbwzn0tvMIt/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1syQu6vAbUGdSVRnaSlmXFUbwzn0tvMIt/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Shoulders"
    ]
  },
  {
    "id": "1qCOtD6DySgRNqrf1jzz3fUbwSGgHPoWU",
    "fileName": "Dumbbell One Arm Lateral Raise.mp4",
    "name": "Dumbbell One Arm Lateral Raise",
    "gender": "MEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell One Arm Lateral Raise.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1qCOtD6DySgRNqrf1jzz3fUbwSGgHPoWU/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1qCOtD6DySgRNqrf1jzz3fUbwSGgHPoWU/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Shoulders"
    ]
  },
  {
    "id": "1vfChJ_68kT_vKw4Juc8Cm7Q-NZl1ec8I",
    "fileName": "Dumbbell Rear Delt Row.mp4",
    "name": "Dumbbell Rear Delt Row",
    "gender": "MEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Rear Delt Row.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1vfChJ_68kT_vKw4Juc8Cm7Q-NZl1ec8I/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1vfChJ_68kT_vKw4Juc8Cm7Q-NZl1ec8I/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Shoulders"
    ]
  },
  {
    "id": "18sw8pvVkT44u7ALWtcIFRPqERjBmUHv0",
    "fileName": "Dumbbell Rear Lateral Raise.mp4",
    "name": "Dumbbell Rear Lateral Raise",
    "gender": "MEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Rear Lateral Raise.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/18sw8pvVkT44u7ALWtcIFRPqERjBmUHv0/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/18sw8pvVkT44u7ALWtcIFRPqERjBmUHv0/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Shoulders"
    ]
  },
  {
    "id": "1Gk3t3WgyPRhsUHvYGGjLQv4-rFN8xoSG",
    "fileName": "Dumbbell Seated Front Raise.mp4",
    "name": "Dumbbell Seated Front Raise",
    "gender": "MEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Seated Front Raise.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1Gk3t3WgyPRhsUHvYGGjLQv4-rFN8xoSG/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Gk3t3WgyPRhsUHvYGGjLQv4-rFN8xoSG/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Shoulders"
    ]
  },
  {
    "id": "1qt5twFfesfR_MijYrjOxeDe-EWBQm3pR",
    "fileName": "Dumbbell Seated Lateral Raise.mp4",
    "name": "Dumbbell Seated Lateral Raise",
    "gender": "MEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Seated Lateral Raise.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1qt5twFfesfR_MijYrjOxeDe-EWBQm3pR/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1qt5twFfesfR_MijYrjOxeDe-EWBQm3pR/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Shoulders"
    ]
  },
  {
    "id": "1wgo6s8Yw4qj26c3kdffS-xXtQtBqTCGp",
    "fileName": "Dumbbell Upright Row.mp4",
    "name": "Dumbbell Upright Row",
    "gender": "MEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Upright Row.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1wgo6s8Yw4qj26c3kdffS-xXtQtBqTCGp/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1wgo6s8Yw4qj26c3kdffS-xXtQtBqTCGp/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Shoulders"
    ]
  },
  {
    "id": "1s7FyNLFZkFi88BD2-BXs2oCQvs7n7hQ9",
    "fileName": "EZ Barbell Anti Gravity Press.mp4",
    "name": "EZ Barbell Anti Gravity Press",
    "gender": "MEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for EZ Barbell Anti Gravity Press.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1s7FyNLFZkFi88BD2-BXs2oCQvs7n7hQ9/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1s7FyNLFZkFi88BD2-BXs2oCQvs7n7hQ9/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Shoulders"
    ]
  },
  {
    "id": "1YaVSc6-g7kPf0PgJdlDDaXOyAm8x_lPx",
    "fileName": "Lever Lateral Raise.mp4",
    "name": "Lever Lateral Raise",
    "gender": "MEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Lateral Raise.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1YaVSc6-g7kPf0PgJdlDDaXOyAm8x_lPx/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1YaVSc6-g7kPf0PgJdlDDaXOyAm8x_lPx/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Shoulders"
    ]
  },
  {
    "id": "1wLEhZNK1JfcAT2BaSknBBeqIPFiLvqnt",
    "fileName": "Lever Military Press.mp4",
    "name": "Lever Military Press",
    "gender": "MEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Military Press.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1wLEhZNK1JfcAT2BaSknBBeqIPFiLvqnt/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1wLEhZNK1JfcAT2BaSknBBeqIPFiLvqnt/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Shoulders"
    ]
  },
  {
    "id": "1I8g3b8y_F2LousUWyaWwUYwowPiKGCE_",
    "fileName": "Lever Seated Reverse Fly.mp4",
    "name": "Lever Seated Reverse Fly",
    "gender": "MEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Seated Reverse Fly.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1I8g3b8y_F2LousUWyaWwUYwowPiKGCE_/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1I8g3b8y_F2LousUWyaWwUYwowPiKGCE_/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Shoulders"
    ]
  },
  {
    "id": "1j8Yl6ejZenK4dTdoH9tn-Q-bcCyEmKXU",
    "fileName": "Military Press.mp4",
    "name": "Military Press",
    "gender": "MEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Military Press.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1j8Yl6ejZenK4dTdoH9tn-Q-bcCyEmKXU/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1j8Yl6ejZenK4dTdoH9tn-Q-bcCyEmKXU/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Shoulders"
    ]
  },
  {
    "id": "1nqYMUy-IS_q-Y-L1CNL0wWxPzmMS6iQ2",
    "fileName": "Smith Seated Shoulder Press.mp4",
    "name": "Smith Seated Shoulder Press",
    "gender": "MEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Smith Seated Shoulder Press.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1nqYMUy-IS_q-Y-L1CNL0wWxPzmMS6iQ2/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1nqYMUy-IS_q-Y-L1CNL0wWxPzmMS6iQ2/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Shoulders"
    ]
  },
  {
    "id": "12p1WczGeoGY9M7jn_CWlGhldd0gDvoaz",
    "fileName": "Stretching - Band Warm-up Shoulder Stretch.mp4",
    "name": "Stretching - Band Warm-up Shoulder Stretch",
    "gender": "MEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Band Warm-up Shoulder Stretch.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/12p1WczGeoGY9M7jn_CWlGhldd0gDvoaz/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/12p1WczGeoGY9M7jn_CWlGhldd0gDvoaz/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Shoulders"
    ]
  },
  {
    "id": "1zH1awV0qs5aL7Q9By336F_osMQT9rf5O",
    "fileName": "Stretching - Rear Deltoid Stretch.mp4",
    "name": "Stretching - Rear Deltoid Stretch",
    "gender": "MEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Rear Deltoid Stretch.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1zH1awV0qs5aL7Q9By336F_osMQT9rf5O/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1zH1awV0qs5aL7Q9By336F_osMQT9rf5O/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Shoulders"
    ]
  },
  {
    "id": "1toeBBedg37uYbWNWiGO080syfQhNvX7v",
    "fileName": "Stretching - Seated Shoulder Flexor Depresor Retractor.mp4",
    "name": "Stretching - Seated Shoulder Flexor Depresor Retractor",
    "gender": "MEN",
    "subfolderCategory": "Shoulders",
    "muscleGroup": "SHOULDERS",
    "targetMuscles": "Anterior, Lateral & Rear Deltoids",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Seated Shoulder Flexor Depresor Retractor.",
      "02 Movement: Perform controlled execution targeting Anterior, Lateral & Rear Deltoids.",
      "03 Form lock: Lead with elbows on lateral moves, keep traps depressed."
    ],
    "keyFormTip": "Lead with elbows on lateral moves, keep traps depressed.",
    "driveUrl": "https://drive.google.com/file/d/1toeBBedg37uYbWNWiGO080syfQhNvX7v/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1toeBBedg37uYbWNWiGO080syfQhNvX7v/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Shoulders"
    ]
  },
  {
    "id": "1ZrZ9OdhYLXcStW0lIuHLr9rZusaGdQxN",
    "fileName": "Barbell Rear Delt Raise.mp4",
    "name": "Barbell Rear Delt Raise",
    "gender": "MEN",
    "subfolderCategory": "Trapezius",
    "muscleGroup": "BACK",
    "targetMuscles": "Upper, Middle & Lower Trapezius",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "12-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Rear Delt Raise.",
      "02 Movement: Perform controlled execution targeting Upper, Middle & Lower Trapezius.",
      "03 Form lock: Elevate shoulders straight up toward ears, pause at the top."
    ],
    "keyFormTip": "Elevate shoulders straight up toward ears, pause at the top.",
    "driveUrl": "https://drive.google.com/file/d/1ZrZ9OdhYLXcStW0lIuHLr9rZusaGdQxN/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1ZrZ9OdhYLXcStW0lIuHLr9rZusaGdQxN/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Trapezius"
    ]
  },
  {
    "id": "1xjeBTR9ZDQrmtCwKRPhIISCrPosYi9Rk",
    "fileName": "Barbell Shrug.mp4",
    "name": "Barbell Shrug",
    "gender": "MEN",
    "subfolderCategory": "Trapezius",
    "muscleGroup": "BACK",
    "targetMuscles": "Upper, Middle & Lower Trapezius",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "12-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Shrug.",
      "02 Movement: Perform controlled execution targeting Upper, Middle & Lower Trapezius.",
      "03 Form lock: Elevate shoulders straight up toward ears, pause at the top."
    ],
    "keyFormTip": "Elevate shoulders straight up toward ears, pause at the top.",
    "driveUrl": "https://drive.google.com/file/d/1xjeBTR9ZDQrmtCwKRPhIISCrPosYi9Rk/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1xjeBTR9ZDQrmtCwKRPhIISCrPosYi9Rk/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Trapezius"
    ]
  },
  {
    "id": "1mgP98X1y0YdjuOPdDgsaIdaLNwPCbgv8",
    "fileName": "Dumbbell Incline Shrug.mp4",
    "name": "Dumbbell Incline Shrug",
    "gender": "MEN",
    "subfolderCategory": "Trapezius",
    "muscleGroup": "BACK",
    "targetMuscles": "Upper, Middle & Lower Trapezius",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "12-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Incline Shrug.",
      "02 Movement: Perform controlled execution targeting Upper, Middle & Lower Trapezius.",
      "03 Form lock: Elevate shoulders straight up toward ears, pause at the top."
    ],
    "keyFormTip": "Elevate shoulders straight up toward ears, pause at the top.",
    "driveUrl": "https://drive.google.com/file/d/1mgP98X1y0YdjuOPdDgsaIdaLNwPCbgv8/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1mgP98X1y0YdjuOPdDgsaIdaLNwPCbgv8/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Trapezius"
    ]
  },
  {
    "id": "1VaqTV7h19pVe0v9Dqea9dguhun5paMQv",
    "fileName": "Dumbbell Shrug.mp4",
    "name": "Dumbbell Shrug",
    "gender": "MEN",
    "subfolderCategory": "Trapezius",
    "muscleGroup": "BACK",
    "targetMuscles": "Upper, Middle & Lower Trapezius",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "12-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Shrug.",
      "02 Movement: Perform controlled execution targeting Upper, Middle & Lower Trapezius.",
      "03 Form lock: Elevate shoulders straight up toward ears, pause at the top."
    ],
    "keyFormTip": "Elevate shoulders straight up toward ears, pause at the top.",
    "driveUrl": "https://drive.google.com/file/d/1VaqTV7h19pVe0v9Dqea9dguhun5paMQv/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1VaqTV7h19pVe0v9Dqea9dguhun5paMQv/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Trapezius"
    ]
  },
  {
    "id": "1pzPnBrluYaTcg_7_8fgbPoWxJ5oSMool",
    "fileName": "Lever Shrug.mp4",
    "name": "Lever Shrug",
    "gender": "MEN",
    "subfolderCategory": "Trapezius",
    "muscleGroup": "BACK",
    "targetMuscles": "Upper, Middle & Lower Trapezius",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "12-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Shrug.",
      "02 Movement: Perform controlled execution targeting Upper, Middle & Lower Trapezius.",
      "03 Form lock: Elevate shoulders straight up toward ears, pause at the top."
    ],
    "keyFormTip": "Elevate shoulders straight up toward ears, pause at the top.",
    "driveUrl": "https://drive.google.com/file/d/1pzPnBrluYaTcg_7_8fgbPoWxJ5oSMool/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1pzPnBrluYaTcg_7_8fgbPoWxJ5oSMool/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Trapezius"
    ]
  },
  {
    "id": "1TByEM4hiMCuvQC9MuIqDX_YoKDZnsNBC",
    "fileName": "Scapula Dips.mp4",
    "name": "Scapula Dips",
    "gender": "MEN",
    "subfolderCategory": "Trapezius",
    "muscleGroup": "BACK",
    "targetMuscles": "Upper, Middle & Lower Trapezius",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "12-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Scapula Dips.",
      "02 Movement: Perform controlled execution targeting Upper, Middle & Lower Trapezius.",
      "03 Form lock: Elevate shoulders straight up toward ears, pause at the top."
    ],
    "keyFormTip": "Elevate shoulders straight up toward ears, pause at the top.",
    "driveUrl": "https://drive.google.com/file/d/1TByEM4hiMCuvQC9MuIqDX_YoKDZnsNBC/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1TByEM4hiMCuvQC9MuIqDX_YoKDZnsNBC/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Trapezius"
    ]
  },
  {
    "id": "18waSIFLP9HIP9HEx_l6lDHGPWsJiU0SF",
    "fileName": "Stretching - Neck Side Stretch.mp4",
    "name": "Stretching - Neck Side Stretch",
    "gender": "MEN",
    "subfolderCategory": "Trapezius",
    "muscleGroup": "BACK",
    "targetMuscles": "Upper, Middle & Lower Trapezius",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "12-15",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Neck Side Stretch.",
      "02 Movement: Perform controlled execution targeting Upper, Middle & Lower Trapezius.",
      "03 Form lock: Elevate shoulders straight up toward ears, pause at the top."
    ],
    "keyFormTip": "Elevate shoulders straight up toward ears, pause at the top.",
    "driveUrl": "https://drive.google.com/file/d/18waSIFLP9HIP9HEx_l6lDHGPWsJiU0SF/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/18waSIFLP9HIP9HEx_l6lDHGPWsJiU0SF/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Trapezius"
    ]
  },
  {
    "id": "1Vt9JLRFy0UhD7Ffky3F6Qq1fpD3qF6bw",
    "fileName": "Band Overhead Triceps Extension.mp4",
    "name": "Band Overhead Triceps Extension",
    "gender": "MEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "HOME_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Overhead Triceps Extension.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1Vt9JLRFy0UhD7Ffky3F6Qq1fpD3qF6bw/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Vt9JLRFy0UhD7Ffky3F6Qq1fpD3qF6bw/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Triceps"
    ]
  },
  {
    "id": "1ZORexAkeejmK6JtcA3APZcEXZhhpiBXt",
    "fileName": "Band Side Triceps Pushdown.mp4",
    "name": "Band Side Triceps Pushdown",
    "gender": "MEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Side Triceps Pushdown.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1ZORexAkeejmK6JtcA3APZcEXZhhpiBXt/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1ZORexAkeejmK6JtcA3APZcEXZhhpiBXt/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Triceps"
    ]
  },
  {
    "id": "1Kk-gaZnkplsZUtyPUHE3UQmHUvUK0ldR",
    "fileName": "Band Triceps Pushdown.mp4",
    "name": "Band Triceps Pushdown",
    "gender": "MEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "HOME_GYM",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Band Triceps Pushdown.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1Kk-gaZnkplsZUtyPUHE3UQmHUvUK0ldR/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Kk-gaZnkplsZUtyPUHE3UQmHUvUK0ldR/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Triceps"
    ]
  },
  {
    "id": "1dlq5tokCLTOYerbqU6zNPMtAwFn95OYo",
    "fileName": "Barbell Close Grip Bench Press.mp4",
    "name": "Barbell Close Grip Bench Press",
    "gender": "MEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Barbell Close Grip Bench Press.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1dlq5tokCLTOYerbqU6zNPMtAwFn95OYo/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1dlq5tokCLTOYerbqU6zNPMtAwFn95OYo/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Triceps"
    ]
  },
  {
    "id": "16GX54InYWPEPa8GlLztI5rKCf_r6uXya",
    "fileName": "Bench Dips.mp4",
    "name": "Bench Dips",
    "gender": "MEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Bench Dips.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/16GX54InYWPEPa8GlLztI5rKCf_r6uXya/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/16GX54InYWPEPa8GlLztI5rKCf_r6uXya/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Triceps"
    ]
  },
  {
    "id": "1Nw9Ua1-Q11PH-ewKf8Y5PXcFqIfFvE5H",
    "fileName": "Cable Lying Triceps Extension.mp4",
    "name": "Cable Lying Triceps Extension",
    "gender": "MEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Lying Triceps Extension.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1Nw9Ua1-Q11PH-ewKf8Y5PXcFqIfFvE5H/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Nw9Ua1-Q11PH-ewKf8Y5PXcFqIfFvE5H/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Triceps"
    ]
  },
  {
    "id": "1dMJDLvpYKjC8vUDoQGza_ylEuBx29pbL",
    "fileName": "Cable Overhead Triceps Extension (rope attachment).mp4",
    "name": "Cable Overhead Triceps Extension (rope attachment)",
    "gender": "MEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Overhead Triceps Extension (rope attachment).",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1dMJDLvpYKjC8vUDoQGza_ylEuBx29pbL/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1dMJDLvpYKjC8vUDoQGza_ylEuBx29pbL/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Triceps"
    ]
  },
  {
    "id": "1JQlJkda2hiUNxq7bSupspEZpwImmka2M",
    "fileName": "Cable Pushdown (rope attachment).mp4",
    "name": "Cable Pushdown (rope attachment)",
    "gender": "MEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Pushdown (rope attachment).",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1JQlJkda2hiUNxq7bSupspEZpwImmka2M/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1JQlJkda2hiUNxq7bSupspEZpwImmka2M/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Triceps"
    ]
  },
  {
    "id": "1xluJQBz3xNkO-rlCGMUTDGlKrzu-WS6u",
    "fileName": "Cable Rope High Pulley Overhead Triceps Extension.mp4",
    "name": "Cable Rope High Pulley Overhead Triceps Extension",
    "gender": "MEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Rope High Pulley Overhead Triceps Extension.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1xluJQBz3xNkO-rlCGMUTDGlKrzu-WS6u/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1xluJQBz3xNkO-rlCGMUTDGlKrzu-WS6u/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Triceps"
    ]
  },
  {
    "id": "1FuH-F_wSJdd3vNwCRmYlC5SQyTnugNJc",
    "fileName": "Cable Standing One Arm Triceps Extension.mp4",
    "name": "Cable Standing One Arm Triceps Extension",
    "gender": "MEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Standing One Arm Triceps Extension.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1FuH-F_wSJdd3vNwCRmYlC5SQyTnugNJc/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1FuH-F_wSJdd3vNwCRmYlC5SQyTnugNJc/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Triceps"
    ]
  },
  {
    "id": "12PLMJZSV1cIBrr5WWh0seWrgT1hrez9Y",
    "fileName": "Cable Triceps Pushdown.mp4",
    "name": "Cable Triceps Pushdown",
    "gender": "MEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Cable Triceps Pushdown.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/12PLMJZSV1cIBrr5WWh0seWrgT1hrez9Y/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/12PLMJZSV1cIBrr5WWh0seWrgT1hrez9Y/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Triceps"
    ]
  },
  {
    "id": "1MY2kWcZrDjIySwW7LocUNaQ4K1swHU6I",
    "fileName": "Close Grip Push-ups.mp4",
    "name": "Close Grip Push-ups",
    "gender": "MEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "NO_EQUIPMENT",
    "difficulty": "BEGINNER",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Close Grip Push-ups.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1MY2kWcZrDjIySwW7LocUNaQ4K1swHU6I/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1MY2kWcZrDjIySwW7LocUNaQ4K1swHU6I/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Triceps"
    ]
  },
  {
    "id": "1f2gr_urAE6Rf8T9ybGlDDiT4-RD4ukXA",
    "fileName": "Dumbbell Close Grip Press.mp4",
    "name": "Dumbbell Close Grip Press",
    "gender": "MEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Close Grip Press.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1f2gr_urAE6Rf8T9ybGlDDiT4-RD4ukXA/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1f2gr_urAE6Rf8T9ybGlDDiT4-RD4ukXA/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Triceps"
    ]
  },
  {
    "id": "1Pm_M9iilxYmUnCWzYd4Vs5HZrmEl0RyL",
    "fileName": "Dumbbell Incline Triceps Extension.mp4",
    "name": "Dumbbell Incline Triceps Extension",
    "gender": "MEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Incline Triceps Extension.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1Pm_M9iilxYmUnCWzYd4Vs5HZrmEl0RyL/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1Pm_M9iilxYmUnCWzYd4Vs5HZrmEl0RyL/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Triceps"
    ]
  },
  {
    "id": "14j9fqnsac0_igp7QsuPbgIXykbm4En7Y",
    "fileName": "Dumbbell Kickback.mp4",
    "name": "Dumbbell Kickback",
    "gender": "MEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Kickback.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/14j9fqnsac0_igp7QsuPbgIXykbm4En7Y/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/14j9fqnsac0_igp7QsuPbgIXykbm4En7Y/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Triceps"
    ]
  },
  {
    "id": "19u_GHb6cuPeKnRcBPcamoITZfjXwsQMv",
    "fileName": "Dumbbell Lying Alternate Extension.mp4",
    "name": "Dumbbell Lying Alternate Extension",
    "gender": "MEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Lying Alternate Extension.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/19u_GHb6cuPeKnRcBPcamoITZfjXwsQMv/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/19u_GHb6cuPeKnRcBPcamoITZfjXwsQMv/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Triceps"
    ]
  },
  {
    "id": "19wG29y8HEFpL2KvP37f2oqyUMBsF6X2o",
    "fileName": "Dumbbell Lying Triceps Extension.mp4",
    "name": "Dumbbell Lying Triceps Extension",
    "gender": "MEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Lying Triceps Extension.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/19wG29y8HEFpL2KvP37f2oqyUMBsF6X2o/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/19wG29y8HEFpL2KvP37f2oqyUMBsF6X2o/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Triceps"
    ]
  },
  {
    "id": "1FttBdXgaIWXk-FXTzjHdjn01ykM3reRj",
    "fileName": "Dumbbell One Arm Triceps Extension.mp4",
    "name": "Dumbbell One Arm Triceps Extension",
    "gender": "MEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell One Arm Triceps Extension.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1FttBdXgaIWXk-FXTzjHdjn01ykM3reRj/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1FttBdXgaIWXk-FXTzjHdjn01ykM3reRj/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Triceps"
    ]
  },
  {
    "id": "13pptARzU-GRawViiy6TfgLqPyVe9C6el",
    "fileName": "Dumbbell Pronate-grip Triceps Extension.mp4",
    "name": "Dumbbell Pronate-grip Triceps Extension",
    "gender": "MEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Pronate-grip Triceps Extension.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/13pptARzU-GRawViiy6TfgLqPyVe9C6el/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/13pptARzU-GRawViiy6TfgLqPyVe9C6el/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Triceps"
    ]
  },
  {
    "id": "1hxxnWC05lk6n9rOvZj3NNoel-A-2ijJG",
    "fileName": "Dumbbell Seated Kickback.mp4",
    "name": "Dumbbell Seated Kickback",
    "gender": "MEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Seated Kickback.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1hxxnWC05lk6n9rOvZj3NNoel-A-2ijJG/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1hxxnWC05lk6n9rOvZj3NNoel-A-2ijJG/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Triceps"
    ]
  },
  {
    "id": "1a978Tihl0aGnTykw7zdvj3fj18ch0ldY",
    "fileName": "Dumbbell Seated Triceps Extension.mp4",
    "name": "Dumbbell Seated Triceps Extension",
    "gender": "MEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "DUMBBELLS",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Dumbbell Seated Triceps Extension.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1a978Tihl0aGnTykw7zdvj3fj18ch0ldY/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1a978Tihl0aGnTykw7zdvj3fj18ch0ldY/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Triceps"
    ]
  },
  {
    "id": "180RUvepbY7WXoBrhoc0RhVNDNRhp9b2h",
    "fileName": "EZ Barbell Lying Triceps Extension.mp4",
    "name": "EZ Barbell Lying Triceps Extension",
    "gender": "MEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "FULL_GYM",
    "difficulty": "ADVANCED",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for EZ Barbell Lying Triceps Extension.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/180RUvepbY7WXoBrhoc0RhVNDNRhp9b2h/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/180RUvepbY7WXoBrhoc0RhVNDNRhp9b2h/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Triceps"
    ]
  },
  {
    "id": "13wQImaSZcLhRVJpIyrhbXkl-d3o1Rb1z",
    "fileName": "Lever Seated Dips.mp4",
    "name": "Lever Seated Dips",
    "gender": "MEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Seated Dips.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/13wQImaSZcLhRVJpIyrhbXkl-d3o1Rb1z/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/13wQImaSZcLhRVJpIyrhbXkl-d3o1Rb1z/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Triceps"
    ]
  },
  {
    "id": "1I38TDB16-peKTQlYXiMtajKaYyWQiAx9",
    "fileName": "Lever Triceps Extension (neutral grip).mp4",
    "name": "Lever Triceps Extension (neutral grip)",
    "gender": "MEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Triceps Extension (neutral grip).",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1I38TDB16-peKTQlYXiMtajKaYyWQiAx9/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1I38TDB16-peKTQlYXiMtajKaYyWQiAx9/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Triceps"
    ]
  },
  {
    "id": "1tBX33l0G-YVtMf5aiy-SuEge83MmCXhY",
    "fileName": "Lever Triceps Extension.mp4",
    "name": "Lever Triceps Extension",
    "gender": "MEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Lever Triceps Extension.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1tBX33l0G-YVtMf5aiy-SuEge83MmCXhY/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1tBX33l0G-YVtMf5aiy-SuEge83MmCXhY/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Triceps"
    ]
  },
  {
    "id": "1jRBZpgD8lrJIF5uXk1IHyfu0tPg_ZYVf",
    "fileName": "Old School Reverse Extensions.mp4",
    "name": "Old School Reverse Extensions",
    "gender": "MEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Old School Reverse Extensions.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1jRBZpgD8lrJIF5uXk1IHyfu0tPg_ZYVf/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1jRBZpgD8lrJIF5uXk1IHyfu0tPg_ZYVf/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Triceps"
    ]
  },
  {
    "id": "1SAcYUUZoKWDi3tuVCSnfwWBInDTSEpyu",
    "fileName": "Stretching - Kneeling Triceps Extension.mp4",
    "name": "Stretching - Kneeling Triceps Extension",
    "gender": "MEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Kneeling Triceps Extension.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1SAcYUUZoKWDi3tuVCSnfwWBInDTSEpyu/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1SAcYUUZoKWDi3tuVCSnfwWBInDTSEpyu/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Triceps"
    ]
  },
  {
    "id": "1wyzJzPgo7e7xhPe9pH1D0kIpqCi9VUno",
    "fileName": "Stretching - Reverse Dip.mp4",
    "name": "Stretching - Reverse Dip",
    "gender": "MEN",
    "subfolderCategory": "Triceps",
    "muscleGroup": "ARMS",
    "targetMuscles": "Triceps Brachii (Lateral, Long & Medial Heads)",
    "equipment": "FULL_GYM",
    "difficulty": "INTERMEDIATE",
    "suggestedSets": "3-4",
    "suggestedReps": "10-12",
    "suggestedRestSeconds": 60,
    "instructions": [
      "01 Setup: Stabilize body posture and engage core brace for Stretching - Reverse Dip.",
      "02 Movement: Perform controlled execution targeting Triceps Brachii (Lateral, Long & Medial Heads).",
      "03 Form lock: Lock elbows in place, extend fully without flaring out."
    ],
    "keyFormTip": "Lock elbows in place, extend fully without flaring out.",
    "driveUrl": "https://drive.google.com/file/d/1wyzJzPgo7e7xhPe9pH1D0kIpqCi9VUno/view?usp=sharing",
    "embedUrl": "https://drive.google.com/file/d/1wyzJzPgo7e7xhPe9pH1D0kIpqCi9VUno/preview",
    "path": [
      "exercise (whitout watermark)",
      "men",
      "Triceps"
    ]
  }
];

export function convertDriveVideoToExercise(video: DriveVideoItem): Exercise {
  return {
    id: 'ex_drive_' + video.id,
    name: video.name,
    targetMuscles: video.targetMuscles,
    category: video.muscleGroup,
    difficulty: video.difficulty,
    sets: video.suggestedSets,
    reps: video.suggestedReps,
    restSeconds: video.suggestedRestSeconds,
    instructions: video.instructions,
    keyFormTip: video.keyFormTip,
    videoThumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    videoUrl: video.driveUrl,
    equipment: video.equipment
  };
}
