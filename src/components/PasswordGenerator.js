// src/components/PasswordGenerator.js
import React, { useState } from 'react';

// 密码生成函数
const generatePasswordFromSeed = (seed, length = 16) => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let password = '';
    let seedIndex = 0;

    for (let i = 0; i < length; i++) {
        // 使用用户输入的种子来生成字符索引
        const seedCharCode = seed.charCodeAt(seedIndex % seed.length);
        const charIndex = (seedCharCode + i) % charset.length;
        password += charset[charIndex];

        // 循环种子字符串
        seedIndex++;
    }

    return password;
};

const PasswordGenerator = () => {
    const [input, setInput] = useState('');
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [error, setError] = useState(null);

    // 生成密码的函数
    const generatePassword = () => {
        try {
            if (input === '') {
                setError('Please enter a seed number or string');
                return;
            }

            setError(null); // 重置错误信息
            const generatedPassword = generatePasswordFromSeed(input, length);
            setPassword(generatedPassword);  // 设置生成的密码
        } catch (err) {
            console.error(err);
            setError('Error generating password');
        }
    };

    return (
        <div className="password-generator">
            <h1 className="title-h1">Password Generator</h1>

            {/* 用户输入种子 */}
            <div className="controls">
                <label htmlFor="input">Enter seed (number or string):</label>
                <input
                    type="text"
                    id="input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </div>

            {/* 密码长度输入框 */}
            <div className="controls">
                <label htmlFor="length">Choose password length:</label>
                <input
                    type="number"
                    id="length"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    min="8"
                    max="32"
                />
            </div>

            {/* 生成密码按钮 */}
            <button onClick={generatePassword}>Generate Password</button>

            {/* 错误信息显示 */}
            {error && <div className="error">{error}</div>}

            {/* 显示生成的密码 */}
            <div className="password-display">
                {password ? (
                    <>
                        <p className="text-generator-title"><strong>Generated Password:</strong></p>
                        <input type="text" value={password} readOnly />
                    </>
                ) : (
                    <p>Click the "Generate Password" button to generate a password.</p>
                )}
            </div>
        </div>
    );
};

export default PasswordGenerator;
