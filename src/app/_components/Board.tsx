"use client"
import DarkLightModeButton from '@/components/dark-light-button';

export default function Board() {

    return (
        <div className="min-h-screen  p-6">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold ">Tender Tasks</h1>

                <DarkLightModeButton />

            </div>


        </div>
    );
}