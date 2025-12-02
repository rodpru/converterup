'use server';

import { cookies } from 'next/headers';

export async function createSession(documentId: string) {
    try {
        const apiKey = process.env.NUTRIENT_DWS_VIEWER_API_KEY;

        if (!apiKey) {
            console.error('NUTRIENT_DWS_VIEWER_API_KEY is not set');
            return { success: false, error: 'Server configuration error' };
        }

        if (!documentId) {
            return { success: false, error: 'Document ID is required' };
        }

        // Generate session token with 1 week expiration
        const oneWeekInSeconds = 60 * 60 * 24 * 7;
        const sessionPayload = {
            allowed_documents: [
                {
                    document_id: documentId,
                    document_permissions: ['read', 'write', 'download'],
                },
            ],
            exp: Math.floor(Date.now() / 1000) + oneWeekInSeconds,
        };

        const sessionResponse = await fetch(
            'https://api.nutrient.io/viewer/sessions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify(sessionPayload),
            }
        );

        if (!sessionResponse.ok) {
            const errorText = await sessionResponse.text();
            throw new Error(
                `Session creation failed: ${sessionResponse.status} ${sessionResponse.statusText} - ${errorText}`
            );
        }

        const sessionResult = await sessionResponse.json();
        const sessionToken = sessionResult.jwt;



        const cookieStore = await cookies();
        cookieStore.set('nutrient_session', sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: oneWeekInSeconds,
            path: '/',
        });

        return {
            success: true,
            sessionToken,
        };
    } catch (error: any) {
        console.error('Error creating session:', error);
        return {
            success: false,
            error: error.message || 'Internal server error',
        };
    }
}

export async function uploadDocument(formData: FormData) {
    try {
        const apiKey = process.env.NUTRIENT_DWS_VIEWER_API_KEY;

        if (!apiKey) {
            console.error('NUTRIENT_DWS_VIEWER_API_KEY is not set');
            return { success: false, error: 'Server configuration error' };
        }

        const file = formData.get('file') as File;
        if (!file) {
            console.error('No file found in FormData');
            return { success: false, error: 'No file provided' };
        }



        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);


        const response = await fetch('https://api.nutrient.io/viewer/documents', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': file.type || 'application/pdf',
                'Content-Length': buffer.length.toString(),
            },
            body: buffer,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Upload failed: ${response.statusText} - ${errorText}`);
        }

        const result = await response.json();


        const documentId = result.data?.document_id || result.document_id;

        if (!documentId) {
            return { success: false, error: 'Invalid response from Nutrient API: missing document_id' };
        }

        return { success: true, documentId };
    } catch (error: any) {
        console.error('Error uploading document:', error);
        return { success: false, error: error.message || 'Internal server error' };
    }
}
