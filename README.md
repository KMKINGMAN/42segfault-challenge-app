# CyberSafe Challenge

![CyberSafe Challenge](https://img.shields.io/badge/CyberSafe-Challenge-4cc9f0?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-1.0.2-f72585?style=for-the-badge)
![Skill Level](https://img.shields.io/badge/Level-Beginner_to_Intermediate-7209b7?style=for-the-badge)

## Overview

CyberSafe Challenge is an interactive cybersecurity-themed game designed to teach Morse code decryption in an engaging way. Players must decipher Morse code patterns to unlock a digital safe, testing their pattern recognition and decoding skills in a simulated hacking environment.

## Challenge Description

You are presented with a secure terminal that requires an access code. The access code is encrypted in Morse code and displayed on the terminal screen. Your mission is to decode the Morse patterns into their corresponding digits (0-9) and enter the correct 4-digit code to gain access to the secure system.

## Goals

- **Primary Goal**: Successfully decode the Morse code patterns and enter the correct 4-digit code
- **Learning Goals**:
  - Learn and practice Morse code decoding
  - Understand basic encryption concepts
  - Develop pattern recognition skills
  - Experience a simulated cybersecurity challenge

## Gameplay Features

- **Random Code Generation**: Each time you play or advance to the next level, a new random 4-digit code is generated
- **Progressive Difficulty**: As you advance through levels, you'll face additional challenges
- **Limited Attempts**: You have three attempts to enter the correct code before the system locks out
- **Visual and Audio Feedback**: Engaging visual effects and sound cues enhance the experience
- **Cybersecurity Theme**: Styled like a hacking terminal with Matrix-style effects and cyberpunk aesthetics

## Morse Code Reference

Morse code is a method of encoding text characters as sequences of dots (.) and dashes (-). In this challenge, we use Morse code to represent digits 0-9.

### Digit-to-Morse Code Mapping

| Digit | Morse Code |
|-------|------------|
| 0     | `-----`    |
| 1     | `.----`    |
| 2     | `..---`    |
| 3     | `...--`    |
| 4     | `....-`    |
| 5     | `.....`    |
| 6     | `-....`    |
| 7     | `--...`    |
| 8     | `---..`    |
| 9     | `----.`    |

### How to Decode

1. Each group of Morse code symbols represents a single digit
2. Groups are separated by spaces
3. Identify each group and translate it to its corresponding digit
4. Enter the resulting 4-digit code in the input field

## Example

If the Morse code displayed is:
```
.----  ...--  ....-  --...
```

You would decode it as:
- `.----` = 1
- `...--` = 3
- `....-` = 4
- `--...` = 7

Therefore, the code to enter would be: `1347`

## Technical Information

- **Technologies Used**:
  - HTML5, CSS3, JavaScript
  - Tailwind CSS for responsive design
  - Canvas API for animations
  - Web Audio API for sound effects
- **Browser Compatibility**: 
  - Modern browsers (Chrome, Firefox, Safari, Edge)
  - Responsive design works on mobile and desktop

## How to Run

1. Clone or download the repository
2. Open `index.html` in your web browser
3. Alternatively, host on any web server

## Educational Value

This challenge helps players develop:
- Pattern recognition skills
- Basic cryptography understanding
- Historical communication methods knowledge
- Problem-solving under pressure
- Attention to detail

## About Morse Code

Morse code was developed in the 1830s and 1840s by Samuel Morse and Alfred Vail. Originally created for telegraph communication, it became one of the earliest forms of digital communication. Although largely obsolete for practical communication today, Morse code remains important in:

- Amateur radio
- Emergency situations
- Military applications
- Aviation distress signals

Learning Morse code develops cognitive skills and provides insight into early communication technology that formed the foundation for our modern digital world.

## Development Notes

- Last updated: April 28, 2025
- Created as part of cybersecurity training exercises
- Designed to be both educational and entertaining

---

**Note**: This is a simulation for educational purposes only. No actual hacking occurs in this challenge.

© 2025 CyberSafe Challenge