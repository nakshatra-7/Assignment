import React from 'react';
import { useState } from 'react';
import { MantineProvider, ColorPicker, TextInput, Button, Text, Stack, Group, Title, Code } from '@mantine/core';
import '../App.css';

function DiscordColorGenerator() {
  const [text, setText] = useState('');
  const [fgColor, setFgColor] = useState('#ffffff');
  const [bgColor, setBgColor] = useState('#000000');
  const [result, setResult] = useState('');

  const generateColoredText = () => {
    const fgHex = fgColor.replace('#', '');
    const bgHex = bgColor.replace('#', '');

    const fgR = parseInt(fgHex.substr(0, 2), 16);
    const fgG = parseInt(fgHex.substr(2, 2), 16);
    const fgB = parseInt(fgHex.substr(4, 2), 16);

    const bgR = parseInt(bgHex.substr(0, 2), 16);
    const bgG = parseInt(bgHex.substr(2, 2), 16);
    const bgB = parseInt(bgHex.substr(4, 2), 16);

    const formattedText = "```ansi\n" +
      `\u001b[38;2;${fgR};${fgG};${fgB}m` +
      `\u001b[48;2;${bgR};${bgG};${bgB}m` +
      `${text}\u001b[0m` +
      "\n```";
    
    setResult(formattedText);
  };

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div className="app-container">
        <Stack p="md" maw={600} mx="auto">
          <Title order={1}>Discord Coloured Text Generator</Title>
          
          <TextInput
            label="Enter your text"
            placeholder="Type your message here"
            value={text}
            onChange={(event) => setText(event.currentTarget.value)}
            styles={{
              input: {
                color: fgColor,
                backgroundColor: bgColor,
                border: '1px solid #ccc',
                '&::placeholder': {
                  color: `${fgColor}80`,
                },
              }
            }}
          />

          <Group className="color-picker-container">
            <Text>Foreground color:</Text>
            <ColorPicker
              format="hex"
              value={fgColor}
              onChange={(newColor) => setFgColor(newColor)}
              swatches={[
                '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
                '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB',
                '#E67E22', '#ECF0F1'
              ]}
              swatchesPerRow={5}
              withPicker={true}
              styles={{
                swatch: {
                  cursor: 'pointer',
                  border: '2px solid transparent',
                  '&[data-selected]': {
                    border: '2px solid #000', // Black border for selected swatch
                    boxShadow: '0 0 4px rgba(0, 0, 0, 0.3)',
                  }
                }
              }}
            />
          </Group>

          <Group className="color-picker-container">
            <Text>Background color:</Text>
            <ColorPicker
              format="hex"
              value={bgColor}
              onChange={(newColor) => setBgColor(newColor)}
              swatches={[
                '#2C3E50', '#34495E', '#7F8C8D', '#BDC3C7',
                '#1ABC9C', '#16A085', '#8E44AD', '#9B59B6',
                '#E74C3C', '#C0392B'
              ]}
              swatchesPerRow={5}
              withPicker={true}
              styles={{
                swatch: {
                  cursor: 'pointer',
                  border: '2px solid transparent',
                  '&[data-selected]': {
                    border: '2px solid #000', // Black border for selected swatch
                    boxShadow: '0 0 4px rgba(0, 0, 0, 0.3)',
                  }
                }
              }}
            />
          </Group>

          <Button onClick={generateColoredText}>
            Generate
          </Button>

          {result && (
            <Stack>
              <Text>Copy this into Discord:</Text>
              <Code block className="code-output">{result}</Code>
            </Stack>
          )}

          <Text size="sm" c="gray">
            Paste the generated code in Discord to see your coloured text!
          </Text>
        </Stack>
      </div>
    </MantineProvider>
  );
}

export default DiscordColorGenerator;