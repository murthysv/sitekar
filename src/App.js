import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AudioRecorder } from 'react-audio-voice-recorder';
import circuit from './img/circuit1.png';
import './App.css';

const OverlayText = styled(Box)(({ theme }) => ({
  position: 'absolute',
  zIndex: 2,
  color: 'white',
  textAlign: 'center',
  padding: theme.spacing(2),
  backgroundColor: 'rgba(0, 0, 0, 0.25)', // Semi-transparent background
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', // Center align the content
  gap: theme.spacing(2), // Add space between the elements
}));

const HomeContainer = styled(Container)(({ theme }) => ({
  backgroundColor: '#1a1b30',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#1a1b30',
  textAlign: 'center',
}));

function App() {
  const [message, setMessage] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [buttonColor, setButtonColor] = useState('info');
  const [groqCompletion, setGroqCompletion] = useState('');
  const [audioData, setAudioData] = useState(null);
  const debug = true; 

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    if (debug) console.log('Button clicked');
    setButtonColor(buttonColor === 'info' ? 'error' : 'info');

    fetch('http://localhost:4000/groq', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: inputValue }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (debug) console.log('Groq API response:', data);
        setGroqCompletion(data.completion);
      })
      .catch((error) => console.error('Error fetching Groq completion:', error));
  };

  const handleAudioStop = (data) => {
    if (debug) console.log('Audio recording stopped:', data);
    setAudioData(data);

    const formData = new FormData();
    formData.append('audio', data);

    fetch('http://localhost:4000/whisper', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        if (debug) console.log('Whisper result:', result);
        setGroqCompletion(result.groqResponse);
      })
      .catch((error) => console.error('Error sending audio to Whisper:', error));
  };

  return (
    <HomeContainer maxWidth={false} disableGutters>
      <Box component="img" src={circuit} alt="logo" sx={{
        position: 'absolute',
        height: '100vh',
        maxWidth: '100%',
        display: 'flex',
        justifyContent: 'center',
        transform: 'rotate(180deg)',
        opacity: 0.82,
      }} />
      <OverlayText>
        <Typography variant="h4">Hi, I'm Shrikar! : )</Typography>
        <Typography variant="h6">Server says: {message}</Typography>
        <TextField
          id="outlined-multiline-flexible"
          label="Question"
          color="info"
          multiline
          maxRows={4}
          value={inputValue}
          onChange={handleInputChange}
          sx={{
            backgroundColor: 'white',
          }}
        />
        <Button variant="contained" color={buttonColor} onClick={handleButtonClick}>
          Press & Ask me a Question
        </Button>
        <AudioRecorder
          onRecordingComplete={handleAudioStop}
          render={({ startRecording, stopRecording }) => (
            <>
              <Button variant="contained" color="primary" onClick={startRecording}>
                Start Recording
              </Button>
              <Button variant="contained" color="secondary" onClick={stopRecording} sx={{ marginTop: '10px' }}>
                Stop Recording
              </Button>
            </>
          )}
        />
        {groqCompletion && (
          <Typography variant="h6" sx={{ marginTop: '20px' }}>
            Groq says: {groqCompletion}
          </Typography>
        )}
      </OverlayText>
    </HomeContainer>
  );
}

export default App;
