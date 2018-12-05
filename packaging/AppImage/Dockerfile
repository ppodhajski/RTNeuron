FROM ppx86/centos_gcc


# RTNeuron
################
##RUN rm -f /usr/lib64/libX11.so

ADD . /RTNeuron
RUN ls /RTNeuron 
RUN cd /RTNeuron && mkdir build && cd build && cmake ../ -DCLONE_SUBPROJECTS=ON -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX=/usr/local
RUN cd /RTNeuron/osgTransparency && git pull origin master && cd /RTNeuron/build &&  make -j mvd-tool RTNeuron-all RTNeuron-install

WORKDIR /RTNeuron/build
RUN make -j RTNeuron-install DESTDIR=/root/RT

# APP image
###################
WORKDIR /root
RUN curl -LO https://github.com/linuxdeploy/linuxdeploy/releases/download/continuous/linuxdeploy-x86_64.AppImage && \
chmod +x ./linuxdeploy-x86_64.AppImage

RUN yum clean all && yum  install -y fuse-devel 

# AppImageTool
RUN curl -LO https://github.com/AppImage/AppImageKit/releases/download/continuous/appimagetool-x86_64.AppImage
RUN chmod +x /root/appimagetool-x86_64.AppImage
RUN /root/appimagetool-x86_64.AppImage --appimage-extract && pwd && ls

WORKDIR /root/RT

RUN mkdir -p ./usr && cp -rf /usr/local ./usr/

RUN cp /usr/lib64/libGLEWmx.so.1.10 usr/local/lib64/


ADD config .
RUN chmod +x /root/RT/AppRun
RUN /root/squashfs-root/AppRun /root/RT /tmp/rtneuron_x86_64.AppImage

CMD ["bash", "-c", "exit", "0"]
