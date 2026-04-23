import { knowledgeBase } from '../data/knowledgeBase';

const API_KEY = import.meta.env.VITE_AI_API_KEY;
const MODEL = import.meta.env.VITE_AI_MODEL;

const PROXY_PATH = '/api/xf';

export async function sendAIMessage(messages, options = {}) {
  const { temperature = 0.7, maxTokens = 2000, systemPrompt: customSystemPrompt } = options;

  const defaultSystemPrompt = knowledgeBase.functions.qa.instruction;
  const systemPrompt = customSystemPrompt || defaultSystemPrompt;

  const requestMessages = [
    { role: 'system', content: systemPrompt },
    ...messages.map(msg => ({
      ...msg,
      role: msg.role === 'ai' ? 'assistant' : msg.role
    }))
  ];

  const requestUrl = `${PROXY_PATH}/chat/completions`;

  console.log('========================================');
  console.log('[AI Service] 请求信息:');
  console.log('  URL:', requestUrl);
  console.log('  Method: POST');
  console.log('  Model:', MODEL);
  console.log('  Messages数量:', requestMessages.length);
  console.log('  System Prompt:', systemPrompt.substring(0, 100) + '...');
  console.log('  请求Messages:', JSON.stringify(requestMessages, null, 2));
  console.log('========================================');

  try {
    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: requestMessages,
        temperature,
        max_tokens: maxTokens,
      }),
    });

    console.log('[AI Service] 响应状态:', response.status);
    console.log('[AI Service] 响应Headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[AI Service] 错误响应:', errorText);

      let errorMessage = `HTTP ${response.status}`;
      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.error?.message) {
          errorMessage = errorJson.error.message;
        } else if (errorJson.message) {
          errorMessage = errorJson.message;
        }
      } catch (e) {
        errorMessage = errorText || `HTTP ${response.status}`;
      }

      if (response.status === 401) {
        throw new Error(`[401 Unauthorized] API Key错误: ${errorMessage}`);
      } else if (response.status === 400) {
        throw new Error(`[400 Bad Request] 请求参数错误: ${errorMessage}`);
      } else if (response.status === 403) {
        throw new Error(`[403 Forbidden] 访问被拒绝: ${errorMessage}`);
      } else {
        throw new Error(`${errorMessage}`);
      }
    }

    const data = await response.json();
    console.log('[AI Service] 响应数据:', JSON.stringify(data, null, 2).substring(0, 500) + '...');

    if (!data.choices || !data.choices[0]) {
      throw new Error('API返回格式异常：缺少choices字段');
    }

    const assistantMessage = data.choices[0].message;
    console.log('[AI Service] AI回复:', assistantMessage.content.substring(0, 200) + '...');

    return {
      role: assistantMessage.role || 'assistant',
      content: assistantMessage.content,
      usage: data.usage,
    };
  } catch (error) {
    console.error('========================================');
    console.error('[AI Service] 捕获到错误:');
    console.error('  Error Name:', error.name);
    console.error('  Error Message:', error.message);
    console.error('  Error Stack:', error.stack);
    console.error('========================================');
    throw error;
  }
}

export function createAIErrorMessage(error) {
  if (error.message.includes('[401')) {
    return `🔑 **API Key错误**\n\n${error.message}\n\n请检查：\n1. .env文件中VITE_AI_API_KEY是否正确\n2. API Key是否已过期\n3. API Key是否有权限调用当前模型`;
  } else if (error.message.includes('[400')) {
    return `📝 **请求参数错误**\n\n${error.message}\n\n请检查：\n1. 模型名称是否正确\n2. 输入内容是否超出长度限制`;
  } else if (error.message.includes('Failed to fetch') || error.message.includes('Network')) {
    return `🌐 **网络/CORS错误**\n\n无法连接到AI服务。\n\n**错误详情**: ${error.message}\n\n**可能原因**：\n1. Vite代理未正确配置\n2. 目标服务器不可用\n3. CORS跨域限制\n\n**当前配置**：\n- 代理路径: /api/xf\n- 实际请求: https://maas-coding-api.cn-huabei-1.xf-yun.com\n\n请查看浏览器控制台(F12)的详细错误信息`;
  } else {
    return `❌ **发生错误**\n\n${error.message}\n\n请查看浏览器控制台获取更多调试信息`;
  }
}
